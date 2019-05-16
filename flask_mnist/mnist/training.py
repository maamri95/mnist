
# coding: utf-8

import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential, save_model, load_model
from tensorflow.keras.layers import Dense, Dropout, Flatten, Lambda


def fit():
    (trains, targets_train), (tests, targets_test) = mnist.load_data()

    model = Sequential()
    model.add(Lambda(lambda x: x / 255.0, input_shape=(28, 28)))
    model.add(Flatten(input_shape=(28, 28)))
    model.add(Dense(128, activation="relu"))
    model.add(Dense(10, activation="softmax"))
    model.compile(
        loss=tf.keras.losses.sparse_categorical_crossentropy,
        optimizer='adam',
        metrics=["accuracy"]
    )
    history = model.fit(trains, targets_train, epochs=6, validation_split=0.2, batch_size=50)
    model.save("mnist_model.h5")
    return history


if __name__ == '__main__':
    history = fit()
    loss_curve = history.history["loss"]
    acc_curve = history.history["acc"]
    loss_val_curve = history.history["val_loss"]
    acc_val_curve = history.history["val_acc"]

    plt.plot(loss_curve, label="Train")
    plt.plot(loss_val_curve, label="Val")
    plt.title("Loss")
    plt.show()

    plt.plot(acc_curve, label="Train")
    plt.plot(acc_val_curve, label="Val")
    plt.title("Accuracy")
    plt.show()



