from flask import Flask, request
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_crypto():
    with open('data.txt') as json_file:
        data = json.load(json_file)
    

    if request.method == 'GET':
        return (data, 200)

