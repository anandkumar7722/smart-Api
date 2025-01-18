# Garbage Classifier

Garbage Classifier using Transfer Learning: ML-powered REST API for classifying waste. Built with FastAPI, TensorFlow, and Transfer Learning on NASNet.

Use the live web version here : [Garbage Classifier - Web App](https://garbage-classifier-fastapi.onrender.com/static/index.html) <br>
To reimplement this on your own and get the models, I have made a complete end-to-end guide & instructions here: [CNN & Transfer Learning](https://github.com/g-wtham/trash-classification-cnn-transferlearning)

## System Architecture:
![architecture1](https://github.com/user-attachments/assets/77f5ee56-75bd-46ee-b52b-9086b80cd0cc)
![architecture2](https://github.com/user-attachments/assets/21ba0b19-a6bd-4872-ab8b-d0152750507e)


## Setup Instructions :

1. Clone the repository to your local machine (or) download as a _.zip_ file and extract it :

`git clone https://github.com/g-wtham/garbage-classifier-fastapi/` <br>
`cd garbage-classifier-fastapi`

2. Install the required dependencies using :
`pip install -r requirements.txt`

3. Change the fetch url in _`/static/script.js`_ file to `127.0.0.1:8000/predict` to start the FastAPI local development server. Open the `main.py` file in your code editor, run `uvicorn main:app --reload` in the terminal.

4. Run the local dev server `localhost:8000` or `localhost:8000/static/index.html`. Done :)

And right there is your web interface!

Now you can upload your images and get the predictions! Colab file is also given which is used for training the model. 

## Model used :
1. NasNet Mobile - Last 15 layers are trained on the [`TrashNet dataset`](https://www.kaggle.com/datasets/feyzazkefe/trashnet) and obtained _99.88%_ accuracy after _30 epochs!_

https://github.com/user-attachments/assets/35ce0c52-9b90-40d8-8113-724511789e0e






