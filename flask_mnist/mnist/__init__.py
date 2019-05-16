import os
dir_path = os.path.dirname(os.path.abspath(__file__))
from .use import predict
from .training import fit