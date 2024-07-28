import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename  # for secure file handling
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Configure uploads folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the pre-trained model
model = load_model('Image-Detection.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if the request contains a file part
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        # Check if the file is empty
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Secure filename handling
        filename = secure_filename(file.filename)

        # Save the uploaded image (optional)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Read the image file
        img_bytes = file.read()
        img_np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({'error': 'Error decoding image'}), 400

        # Resize the image
        resize = tf.image.resize(img, (256, 256))

        # Normalize the image
        resize = resize / 255.0

        # Make prediction
        yhat = model.predict(np.expand_dims(resize, axis=0))

        # Check the prediction result
        if yhat < 0.8:
            result = 'Safe to use'
        else:
            result = 'Phishing Website'

        return jsonify({'result': result}), 200

    except Exception as e:
        # Log the exception
        print(f"Exception: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)  # debug mode disabled


