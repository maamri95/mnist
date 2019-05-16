from flask import Flask, render_template, json, request
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
    return render(pre, 200)


def render(context, status, mimetype="application/json"):
    """
    perime de render de json
    :param context: contexte a serialize
    :param status: statute a rendre
    :param mimetype: header
    :return: http  response
    """
    return app.response_class(
        response=json.dumps(context),
        status=status,
        mimetype=mimetype
    )


