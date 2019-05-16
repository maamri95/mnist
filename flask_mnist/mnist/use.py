# coding: utf-8

import os
from base64 import b64decode

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from tensorflow.keras.models import load_model
from numpy import array
from tensorflow.keras.datasets import mnist
from PIL import Image, ImageFilter, ImageOps
from matplotlib.pyplot import imread, show, imshow
import numpy as np


(_, _), (tests, targets_test) = mnist.load_data()


def decode(data: str):
    header, encoded = str(data).split(",", 1)
    data = b64decode(encoded)
    with open("image.png", "wb") as f:
        f.write(data)
        f.close()
    img = Image.open('image.png')
    img = np.array(img)[..., 3]
    imshow(img, cmap='binary')
    show()
    return img


def predict(data: str):
    model = load_model("./mnist/mnist_model.h5")
    x = decode(data)
    return "il y a ecrit " + str(model.predict_classes(array([x]))[0])


if __name__ == '__main__':
    model = load_model("mnist_model.h5")
    loss, acc = model.evaluate(tests, targets_test)
    print("Test loss ", loss)
    print("Test accuracy ", acc)