from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.models import load_model
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import numpy as np
import uvicorn
from fastapi.responses import JSONResponse # For converting returned 'dict' into 'JSON' for better info exchange over HTTP
from fastapi.responses import HTMLResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Note: Allows all origins to use API, leads to security issues, I have allowed it in local dev for ease of testing. Only allow permitted sites, in production environments.
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

model = load_model('./models/garbage_classification_tf_nasnet.h5') # Trained on TrashNet dataset using Transfer Learning on NasNet Mobile Model

def preprocess_image(image_file, target_size=(224,224)):
    image = Image.open(image_file)
    image = image.resize(target_size)
    img_array = img_to_array(image)
    image = np.expand_dims(img_array, axis=0)
    image = image / 255
    return image

class_labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'Trash']

app.mount("/static", StaticFiles(directory="static"), name="static") # Serves the HTML file on `localhost:8000` & `localhost:8000/static/index.html`

@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read())

@app.post('/predict')
async def predict_image(file: UploadFile = File(...)):
    try:
        preprocessed_img = preprocess_image(file.file)
        predictions = model.predict(preprocessed_img)
        predicted_class = np.argmax(predictions, axis=1)[0]  # Finds the max prob score along the row axis(1) & selects the first item
        confidence_class = np.max(predictions, axis=1)[0]
        predicted_label = class_labels[predicted_class]
        return JSONResponse(content={
            "predicted_label" : predicted_label,
            "confidence_score" : float(confidence_class)
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
