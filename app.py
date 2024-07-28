
import uvicorn
from fastapi import FastAPI
import joblib, os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# pkl
phish_model = open('phishing.pkl', 'rb')
phish_model_ls = joblib.load(phish_model)

# Define a function to make predictions
def predict_phishing(feature):
    # Replace this with your actual model prediction logic
    # Example: result = my_model.predict(feature)
    # You may need to preprocess 'feature' before making predictions
    # Example: feature = preprocess_data(feature)
    
    # For now, I'm using a placeholder logic
    if "phishing" in feature:
        return "bad"  # Phishing
    else:
        return "good"  # Not Phishing

# ML Aspect
@app.get('/predict')
async def predict(feature: str):
    X_predict = []
    X_predict.append(str(feature))
    y_Predict = phish_model_ls.predict(X_predict)
    if y_Predict == 'bad':
        result = "This is a Phishing Site"
    else:
        result = "This is not a Phishing Site"

    return {"features": feature, "result": result}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)

#uvicorn prediction_app:app --reload

# Configure CORS
origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# python -m uvicorn app:app --host 0.0.0.0 --port 8000