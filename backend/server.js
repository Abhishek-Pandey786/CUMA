const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { exec } = require('child_process');
const path = require('path');
const http = require('http');
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cmike6294@gmail.com',
    pass: 'owig npdv gdyo wapn'  // App-specific password
  }
});

// Test the email configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhishek@8122',
  database: 'cuma_db'
});

// JWT secret key
const JWT_SECRET = 'cuma-admin-secret-key-2024-secure-123!@#';

// Add these constants at the top with your other configurations
const PYTHON_ENV_PATH = path.join(__dirname, '..', 'Multilingual-AI-Assistant-main', 'llmapp', 'Scripts');
const STREAMLIT_APP_PATH = path.join(__dirname, '..', 'Multilingual-AI-Assistant-main', 'app.py');

// Keep track of the Streamlit process
let streamlitProcess = null;

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM admins WHERE email = ? AND password = ?';
  
  connection.query(query, [email, password], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ adminId: results[0].id }, JWT_SECRET, { expiresIn: '1h' });

    // Track the admin login session
    await trackUserLogin(results[0].id, 'Admin');

    res.json({
      message: "Login successful",
      token: token,
      admin: {
        id: results[0].id,
        email: results[0].email,
        fullName: 'Admin'
      }
    });
  });
});

// Add this new endpoint for student registration
app.post('/api/students/register', async (req, res) => {
  const { fullName, email, password, studentId } = req.body;

  // Check if student already exists
  const checkQuery = 'SELECT * FROM students WHERE email = ? OR studentId = ?';
  
  connection.query(checkQuery, [email, studentId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ 
        message: "Email or Student ID already registered" 
      });
    }

    // Insert new student
    const insertQuery = 'INSERT INTO students (fullName, email, password, studentId) VALUES (?, ?, ?, ?)';
    
    connection.query(insertQuery, [fullName, email, password, studentId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error registering student" });
      }

      res.status(201).json({
        message: "Student registered successfully",
        studentId: results.insertId
      });
    });
  });
});

// Add this new endpoint for student login
app.post('/api/students/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM students WHERE email = ? AND password = ?';
  
  connection.query(query, [email, password], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token for student
    const token = jwt.sign({ studentId: results[0].id }, JWT_SECRET, { expiresIn: '1h' });

    // Track the login session
    await trackUserLogin(results[0].id, 'Student');

    // Send back all necessary student information
    res.json({
      message: "Login successful",
      token: token,
      student: {
        id: results[0].id,
        fullName: results[0].fullName,
        email: results[0].email,
        studentId: results[0].studentId
      }
    });
  });
});

// Faculty Registration Endpoint
app.post('/api/faculty/register', async (req, res) => {
  const { fullName, email, password, department } = req.body;

  // Check if faculty already exists
  const checkQuery = 'SELECT * FROM faculty WHERE email = ?';
  
  connection.query(checkQuery, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ 
        message: "Email already registered" 
      });
    }

    // Insert new faculty
    const insertQuery = 'INSERT INTO faculty (fullName, email, password, department) VALUES (?, ?, ?, ?)';
    
    connection.query(insertQuery, [fullName, email, password, department], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error registering faculty" });
      }

      res.status(201).json({
        message: "Faculty registered successfully",
        facultyId: results.insertId
      });
    });
  });
});

// Faculty Login Endpoint
app.post('/api/faculty/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM faculty WHERE email = ? AND password = ?';
  
  connection.query(query, [email, password], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token for faculty
    const token = jwt.sign({ facultyId: results[0].id }, JWT_SECRET, { expiresIn: '1h' });

    // Track the login session
    await trackUserLogin(results[0].id, 'Faculty');

    res.json({
      message: "Login successful",
      token: token,
      faculty: {
        id: results[0].id,
        fullName: results[0].fullName,
        email: results[0].email,
        department: results[0].department
      }
    });
  });
});

// Get admin dashboard stats and users
app.get('/api/admin/dashboard-stats', async (req, res) => {
  try {
    // First, let's log each query separately for debugging
    connection.query('SELECT COUNT(*) as adminCount FROM admins', (error, adminResults) => {
      if (error) {
        console.error('Admin count error:', error);
        return res.status(500).json({ message: "Error counting admins" });
      }
      
      connection.query('SELECT COUNT(*) as studentCount FROM students', (error, studentResults) => {
        if (error) {
          console.error('Student count error:', error);
          return res.status(500).json({ message: "Error counting students" });
        }

        connection.query('SELECT COUNT(*) as facultyCount FROM faculty', (error, facultyResults) => {
          if (error) {
            console.error('Faculty count error:', error);
            return res.status(500).json({ message: "Error counting faculty" });
          }

          // Log the counts for debugging
          console.log('Admin count:', adminResults[0].adminCount);
          console.log('Student count:', studentResults[0].studentCount);
          console.log('Faculty count:', facultyResults[0].facultyCount);

          const totalUsers = 
            parseInt(adminResults[0].adminCount) + 
            parseInt(studentResults[0].studentCount) + 
            parseInt(facultyResults[0].facultyCount);

          console.log('Total users:', totalUsers);

          // Now get all users
          Promise.all([
            new Promise((resolve, reject) => {
              connection.query('SELECT * FROM admins', (error, results) => {
                if (error) reject(error);
                resolve(results);
              });
            }),
            new Promise((resolve, reject) => {
              connection.query('SELECT * FROM students', (error, results) => {
                if (error) reject(error);
                resolve(results);
              });
            }),
            new Promise((resolve, reject) => {
              connection.query('SELECT * FROM faculty', (error, results) => {
                if (error) reject(error);
                resolve(results);
              });
            })
          ])
          .then(([admins, students, faculty]) => {
            const allUsers = [
              ...admins.map(admin => ({
                ...admin,
                role: 'Admin',
                fullName: 'Admin',
                joinDate: '-',
                status: 'Active'
              })),
              ...students.map(student => ({
                ...student,
                role: 'Student',
                joinDate: new Date(student.created_at).toLocaleDateString(),
                status: 'Inactive'
              })),
              ...faculty.map(faculty => ({
                ...faculty,
                role: 'Faculty',
                joinDate: new Date(faculty.created_at).toLocaleDateString(),
                status: 'Inactive'
              }))
            ];

            res.json({
              stats: {
                totalUsers: totalUsers,
                totalReports: 0,
                totalAIResponses: 0,
                totalQueries: 0
              },
              users: allUsers
            });
          })
          .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: "Error fetching users" });
          });
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    // Only fetch students and faculty, exclude admins
    const [students] = await connection.promise().query('SELECT *, "Student" as role FROM students');
    const [faculty] = await connection.promise().query('SELECT *, "Faculty" as role FROM faculty');

    const allUsers = [
      ...students.map(student => ({
        id: student.id,
        name: student.fullName,
        email: student.email,
        role: 'Student',
        joined: new Date(student.created_at || Date.now()).toLocaleDateString()
      })),
      ...faculty.map(faculty => ({
        id: faculty.id,
        name: faculty.fullName,
        email: faculty.email,
        role: 'Faculty',
        joined: new Date(faculty.created_at || Date.now()).toLocaleDateString()
      }))
    ];

    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete user
app.delete('/api/users/:role/:id', async (req, res) => {
  const { role, id } = req.params;
  let table;

  switch (role) {
    case 'Student':
      table = 'students';
      break;
    case 'Faculty':
      table = 'faculty';
      break;
    case 'Admin':
      table = 'admins';
      break;
    default:
      return res.status(400).json({ message: "Invalid role" });
  }

  try {
    await connection.promise().query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Create a new table for user sessions if it doesn't exist
connection.query(`
  CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    logout_time DATETIME,
    session_duration INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Track user login (call this in your login endpoints)
const trackUserLogin = async (userId, userRole) => {
  try {
    // First, check if there's an open session and close it
    await connection.promise().query(
      `UPDATE user_sessions 
       SET logout_time = CURRENT_TIMESTAMP,
           session_duration = TIMESTAMPDIFF(MINUTE, login_time, CURRENT_TIMESTAMP)
       WHERE user_id = ? AND user_role = ? AND logout_time IS NULL`,
      [userId, userRole]
    );

    // Then create a new session
    await connection.promise().query(
      'INSERT INTO user_sessions (user_id, user_role) VALUES (?, ?)',
      [userId, userRole]
    );
  } catch (error) {
    console.error('Error tracking login:', error);
  }
};

// Track user logout
app.post('/api/track-logout', async (req, res) => {
  const { userId, userRole } = req.body;
  
  try {
    // Update all open sessions for this user
    const [result] = await connection.promise().query(
      `UPDATE user_sessions 
       SET logout_time = CURRENT_TIMESTAMP,
           session_duration = TIMESTAMPDIFF(MINUTE, login_time, CURRENT_TIMESTAMP)
       WHERE user_id = ? 
       AND user_role = ? 
       AND logout_time IS NULL`,
      [userId, userRole]
    );
    
    res.json({ 
      message: "Logout tracked successfully",
      updatedSessions: result.affectedRows
    });
  } catch (error) {
    console.error('Error tracking logout:', error);
    res.status(500).json({ message: "Error tracking logout" });
  }
});

// Get activity statistics
app.get('/api/activity-stats', async (req, res) => {
  try {
    // Get average session duration
    const [avgSessionResult] = await connection.promise().query(
      `SELECT AVG(session_duration) as avg_duration 
       FROM user_sessions 
       WHERE session_duration IS NOT NULL`
    );

    // Get total sessions
    const [totalSessionsResult] = await connection.promise().query(
      'SELECT COUNT(*) as total FROM user_sessions'
    );

    // Get peak hours (group by hour and count sessions)
    const [peakHoursResult] = await connection.promise().query(
      `SELECT 
        HOUR(login_time) as hour,
        COUNT(*) as count
       FROM user_sessions
       GROUP BY HOUR(login_time)
       ORDER BY count DESC
       LIMIT 24`
    );

    res.json({
      averageSession: Math.round(avgSessionResult[0].avg_duration || 0),
      totalSessions: totalSessionsResult[0].total,
      peakHours: peakHoursResult.map(row => ({
        hour: `${row.hour}:00`,
        count: row.count
      }))
    });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    res.status(500).json({ message: "Error fetching activity statistics" });
  }
});

// Get most active users - Updated query
app.get('/api/active-users', async (req, res) => {
  try {
    // Update any stale sessions (sessions without logout time that are over 24 hours old)
    await connection.promise().query(
      `UPDATE user_sessions 
       SET logout_time = DATE_ADD(login_time, INTERVAL 1 HOUR),
           session_duration = 60
       WHERE logout_time IS NULL 
       AND login_time < DATE_SUB(NOW(), INTERVAL 24 HOUR)`
    );

    // Get student activities with proper duration calculation
    const [studentActivities] = await connection.promise().query(
      `SELECT 
        s.id as user_id,
        s.fullName as name,
        'Student' as user_role,
        COUNT(us.id) as total_sessions,
        COALESCE(
          AVG(
            CASE 
              WHEN us.logout_time IS NOT NULL 
              THEN us.session_duration
              ELSE TIMESTAMPDIFF(MINUTE, us.login_time, CURRENT_TIMESTAMP)
            END
          ), 
          0
        ) as avg_duration,
        MAX(us.login_time) as last_active
      FROM students s
      LEFT JOIN user_sessions us ON s.id = us.user_id AND us.user_role = 'Student'
      GROUP BY s.id`
    );

    // Get faculty activities with proper duration calculation
    const [facultyActivities] = await connection.promise().query(
      `SELECT 
        f.id as user_id,
        f.fullName as name,
        'Faculty' as user_role,
        COUNT(us.id) as total_sessions,
        COALESCE(
          AVG(
            CASE 
              WHEN us.logout_time IS NOT NULL 
              THEN us.session_duration
              ELSE TIMESTAMPDIFF(MINUTE, us.login_time, CURRENT_TIMESTAMP)
            END
          ), 
          0
        ) as avg_duration,
        MAX(us.login_time) as last_active
      FROM faculty f
      LEFT JOIN user_sessions us ON f.id = us.user_id AND us.user_role = 'Faculty'
      GROUP BY f.id`
    );

    // Combine and sort results
    const allUsers = [...studentActivities, ...facultyActivities]
      .sort((a, b) => (b.total_sessions || 0) - (a.total_sessions || 0))
      .map(user => ({
        ...user,
        avg_duration: Math.round(user.avg_duration || 0),
        last_active: user.last_active || new Date(),
        total_sessions: user.total_sessions || 0
      }));

    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ message: "Error fetching active users" });
  }
});

// Add this new endpoint for faculty profile update
app.put('/api/faculty/update', async (req, res) => {
  const { id, fullName, department, password } = req.body;

  try {
    let updateQuery = 'UPDATE faculty SET fullName = ?, department = ?';
    let queryParams = [fullName, department];

    // Only include password in update if it was provided
    if (password) {
      updateQuery += ', password = ?';
      queryParams.push(password);
    }

    updateQuery += ' WHERE id = ?';
    queryParams.push(id);

    const [result] = await connection.promise().query(updateQuery, queryParams);

    if (result.affectedRows > 0) {
      // Fetch updated faculty data
      const [updatedFaculty] = await connection.promise().query(
        'SELECT id, fullName, email, department FROM faculty WHERE id = ?',
        [id]
      );

      res.json({
        message: "Profile updated successfully",
        faculty: updatedFaculty[0]
      });
    } else {
      res.status(404).json({ message: "Faculty not found" });
    }
  } catch (error) {
    console.error('Error updating faculty profile:', error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Add this endpoint before the app.listen line
app.post('/launch-assistant', async (req, res) => {
  try {
    // Check if Streamlit is already running by trying to connect to the port
    const checkStreamlit = () => {
      return new Promise((resolve) => {
        const req = http.get('http://localhost:8501', (response) => {
          // If we get any response, Streamlit is running
          resolve(true);
        }).on('error', () => {
          // If connection error, Streamlit is not running
          resolve(false);
        });
        req.setTimeout(1000, () => {
          req.destroy();
          resolve(false);
        });
      });
    };

    const isStreamlitRunning = await checkStreamlit();
    
    if (isStreamlitRunning) {
      console.log('Streamlit is already running at http://localhost:8501');
      return res.json({ message: 'Streamlit already running', url: 'http://localhost:8501' });
    }

    // Kill any zombie streamlit processes that might be hanging
    if (streamlitProcess) {
      try {
        process.kill(streamlitProcess.pid, 'SIGTERM');
        console.log('Killed existing Streamlit process');
      } catch (error) {
        console.log('No process to kill or error killing process:', error.message);
      }
      streamlitProcess = null;
    }

    // Start a new streamlit process
    const streamlitPath = path.join(PYTHON_ENV_PATH, 'streamlit.exe');
    const command = `"${streamlitPath}" run "${STREAMLIT_APP_PATH}"`;

    console.log('Launching Streamlit with command:', command);

    streamlitProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error launching Streamlit:', error);
        streamlitProcess = null;
      }
      if (stdout) console.log('Streamlit output:', stdout);
      if (stderr) console.error('Streamlit stderr:', stderr);
    });

    // Set up event listener for when process exits
    streamlitProcess.on('exit', (code) => {
      console.log(`Streamlit process exited with code ${code}`);
      streamlitProcess = null;
    });

    // Wait a short moment to ensure Streamlit has started
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Track the AI usage for stats
    try {
      await trackAIUsage();
    } catch (error) {
      console.error('Error tracking AI usage:', error);
    }

    res.json({ message: 'Streamlit launched successfully', url: 'http://localhost:8501' });
  } catch (error) {
    console.error('Error in launch-assistant endpoint:', error);
    res.status(500).json({ error: error.message || 'Unknown error launching assistant' });
  }
});

// Create courses table if it doesn't exist
connection.query(`
  CREATE TABLE IF NOT EXISTS faculty_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_id INT NOT NULL,
    course_code VARCHAR(10) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    subjects TEXT,
    faculty_language VARCHAR(50),
    student_languages TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id)
  )
`);

// Get faculty courses
app.get('/api/faculty/courses/:facultyId', async (req, res) => {
  try {
    const [courses] = await connection.promise().query(
      'SELECT * FROM faculty_courses WHERE faculty_id = ?',
      [req.params.facultyId]
    );

    res.json(courses.map(course => ({
      id: course.course_code,
      name: course.course_name,
      subjects: JSON.parse(course.subjects),
      facultyLanguage: course.faculty_language,
      studentLanguages: JSON.parse(course.student_languages)
    })));
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Add new course
app.post('/api/faculty/courses', async (req, res) => {
  const { facultyId, courseCode, courseName, subjects, facultyLanguage, studentLanguages } = req.body;
  
  try {
    await connection.promise().query(
      `INSERT INTO faculty_courses 
       (faculty_id, course_code, course_name, subjects, faculty_language, student_languages)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        facultyId,
        courseCode,
        courseName,
        JSON.stringify(subjects),
        facultyLanguage,
        JSON.stringify(studentLanguages)
      ]
    );
    
    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: "Error adding course" });
  }
});

// Update course
app.put('/api/faculty/courses/:courseId', async (req, res) => {
  const { courseName, subjects, facultyLanguage, studentLanguages } = req.body;
  
  try {
    await connection.promise().query(
      `UPDATE faculty_courses 
       SET course_name = ?, subjects = ?, faculty_language = ?, student_languages = ?
       WHERE course_code = ?`,
      [
        courseName,
        JSON.stringify(subjects),
        facultyLanguage,
        JSON.stringify(studentLanguages),
        req.params.courseId
      ]
    );
    
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: "Error updating course" });
  }
});

// Delete course
app.delete('/api/faculty/courses/:courseId', async (req, res) => {
  try {
    await connection.promise().query(
      'DELETE FROM faculty_courses WHERE course_code = ?',
      [req.params.courseId]
    );
    
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: "Error deleting course" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this near your other tracking functions
const trackAIUsage = async () => {
  try {
    const [result] = await connection.promise().query(
      'UPDATE ai_stats SET total_responses = total_responses + 1'
    );
    return result;
  } catch (error) {
    console.error('Error tracking AI usage:', error);
    throw error;
  }
};

// Add this to create the table if it doesn't exist
const createAIStatsTable = async () => {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ai_stats (
        id INT PRIMARY KEY AUTO_INCREMENT,
        total_responses BIGINT DEFAULT 0
      )`
    );
    // Insert initial row if table is empty
    await connection.query(`
      INSERT INTO ai_stats (id, total_responses)
      SELECT 1, 0
      WHERE NOT EXISTS (SELECT 1 FROM ai_stats)
    `);
  } catch (error) {
    console.error('Error creating AI stats table:', error);
    throw error;
  }
};

// Modify your existing /api/admin/dashboard-stats endpoint
app.get('/api/admin/dashboard-stats', async (req, res) => {
  try {
    const [userCount] = await connection.promise().query('SELECT COUNT(*) as count FROM users');
    const [aiStats] = await connection.promise().query('SELECT total_responses FROM ai_stats WHERE id = 1');
    
    // Get other stats as before...
    
    res.json({
      stats: {
        totalUsers: userCount[0].count,
        totalReports: 0,
        totalAIResponses: aiStats[0]?.total_responses || 0,
        totalQueries: 0
      },
      users: []
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
});

// Helper function to send verification email
async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: 'cmike6294@gmail.com',
    to: email,
    subject: 'CUMA - Password Reset Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3c72;">Password Reset Verification Code</h2>
        <p>You have requested to reset your password for your CUMA account. Please use the following verification code:</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <h1 style="color: #2a5298; margin: 0; letter-spacing: 5px;">${code}</h1>
        </div>
        <p>This code will expire in 1 hour.</p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated message from CUMA (Christ University Multilingual Assistant), please do not reply to this email.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Forgot Password endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email, userType } = req.body;

  if (!email || !userType || !['student', 'faculty'].includes(userType)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const tableName = userType === 'student' ? 'students' : 'faculty';
  
  // Check if email exists
  const checkQuery = `SELECT id FROM ${tableName} WHERE email = ?`;
  
  connection.query(checkQuery, [email], async (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      // Don't reveal that the email doesn't exist
      return res.status(200).json({ 
        message: "If your email is registered, you will receive a verification code" 
      });
    }

    const userId = results[0].id;
    
    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration time (1 hour from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Delete any existing unused codes for this email
    const deleteOldCodesQuery = 'DELETE FROM verification_codes WHERE email = ?';
    
    connection.query(deleteOldCodesQuery, [email], async (error) => {
      if (error) {
        console.error('Error deleting old codes:', error);
        return res.status(500).json({ message: "Database error" });
      }

      // Store the new verification code
      const insertQuery = `
        INSERT INTO verification_codes 
        (user_id, email, user_type, code, expires_at) 
        VALUES (?, ?, ?, ?, ?)
      `;
      
      connection.query(insertQuery, [userId, email, userType, verificationCode, expiresAt], async (error) => {
        if (error) {
          console.error('Error inserting verification code:', error);
          return res.status(500).json({ message: "Error generating verification code" });
        }

        // Send verification code via email
        const emailSent = await sendVerificationEmail(email, verificationCode);

        if (!emailSent) {
          return res.status(500).json({ message: "Error sending verification code" });
        }

        res.status(200).json({ 
          message: "Verification code sent to your email"
        });
      });
    });
  });
});

// Verify Code endpoint
app.post('/api/verify-code', async (req, res) => {
  const { email, userType, code } = req.body;

  if (!email || !userType || !code || !['student', 'faculty'].includes(userType)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Check if the code exists and is valid
  const verifyQuery = `
    SELECT * FROM verification_codes 
    WHERE email = ? 
    AND user_type = ? 
    AND code = ? 
    AND used = FALSE 
    AND expires_at > NOW()
    ORDER BY created_at DESC 
    LIMIT 1
  `;
  
  connection.query(verifyQuery, [email, userType, code], (error, results) => {
    if (error) {
      console.error('Error verifying code:', error);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Mark the code as used
    const updateQuery = 'UPDATE verification_codes SET used = TRUE WHERE id = ?';
    
    connection.query(updateQuery, [results[0].id], (error) => {
      if (error) {
        console.error('Error marking code as used:', error);
        return res.status(500).json({ message: "Database error" });
      }

      // Generate a reset token
      const resetToken = jwt.sign(
        { 
          userId: results[0].user_id, 
          userType,
          email,
          purpose: 'password_reset' 
        }, 
        JWT_SECRET, 
        { expiresIn: '15m' }
      );

      res.status(200).json({
        message: "Code verified successfully",
        resetToken
      });
    });
  });
});

// Reset Password endpoint
app.post('/api/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    // Verify the reset token
    const decoded = jwt.verify(resetToken, JWT_SECRET);

    if (decoded.purpose !== 'password_reset') {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    const tableName = decoded.userType === 'student' ? 'students' : 'faculty';
    
    // Update the password
    const updateQuery = `UPDATE ${tableName} SET password = ? WHERE id = ? AND email = ?`;
    
    connection.query(updateQuery, [newPassword, decoded.userId, decoded.email], (error, results) => {
      if (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: "Error updating password" });
      }

      if (results.affectedRows === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
});
