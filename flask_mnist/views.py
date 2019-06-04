from flask import Flask, render_template, json, request, jsonify
from flask_mnist.mnist import predict
app = Flask(__name__)

app.config.from_object('config')


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/predict', methods=["POST"])
def prediction():
    data: str = request.data
    pre = predict(data)
    return jsonify({"message":pre})
