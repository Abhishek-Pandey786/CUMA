# CUMA Favicon Implementation

This directory contains files for implementing the CUMA logo as the favicon for the application.

## Files

- `cuma-logo.svg` - Full logo with text
- `cuma-icon.svg` - Icon-only version for the favicon
- `convert.html` - Web-based tool to convert SVG to favicon and PNG files
- `preview.html` - Preview of how the favicon will look in the browser tab
- `convert.js` - Node.js script for conversion (requires sharp library)

## How to Implement

### Method 1: Using the Web Browser (Recommended)

1. Open `convert.html` in your web browser
2. The page will show previews of the favicon in various sizes
3. Click the "Download" button for each size
4. Move the downloaded files to the `frontend/public/` directory:
   - Replace `favicon.ico` with the downloaded file
   - Replace `logo192.png` with the downloaded file
   - Replace `logo512.png` with the downloaded file
5. Refresh your application to see the changes

### Method 2: Using Node.js (Alternative)

If you have Node.js and the sharp library installed:

1. Install sharp library: `npm install sharp`
2. Run the conversion script: `node convert.js`
3. The script will generate the favicon and logo files in the public directory

## Testing

To see a preview of how the favicon will look:

1. Open `preview.html` in your browser
2. Check the browser tab to see the favicon in action
3. This confirms how it will look when properly implemented

## References

The favicon uses the CUMA logo, which features:

- Background: Deep blue (#0F4C91)
- Icon: Cyan/Teal (#30D5F2)
- Symbol: Sound wave/communication icon
