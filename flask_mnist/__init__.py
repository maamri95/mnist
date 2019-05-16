import os
from flask import Flask

from .views import app
from .mnist import fit


@app.cli.command()
def init_model():
    fit()