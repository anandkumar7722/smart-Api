# Garbage Classifier

Garbage Classifier using Transfer Learning: ML-powered REST API for classifying waste. Built with FastAPI, TensorFlow, and Transfer Learning on NASNet.

## Setup Instructions :

1. Clone the repository to your local machine (or) download as a _.zip_ file and extract it :

`git clone https://github.com/g-wtham/garbage-classifier-fastapi/` <br>
`cd garbage-classifier-fastapi`

2. Install the required dependencies using :
`pip install -r requirements.txt`

3. Open the `main.py` file in your code editor, run `uvicorn main:app --reload` in the terminal, which starts the FastAPI local development server on `http://127.0.0.1:8000/`

4. Run the `index.html` in your browser! Done :)

Now you can upload your images and get the predictions! Colab file is also given which is used for training the model. 

Models used :
1. NasNet Mobile - Last 15 layers are trained on the [`TrashNet dataset`](https://www.kaggle.com/datasets/feyzazkefe/trashnet) and obtained _99.88%_ accuracy after _30 epochs!_






