import google.generativeai as genai

genai.configure(api_key="AIzaSyAbUBvprqye1TvMDk_7E3GII9VuvFabsOo")

models = genai.list_models()
for model in models:
    print(model.name)
