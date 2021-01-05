from flask import Flask, request, send_from_directory
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import ImmutableMultiDict
import os

app = Flask(__name__)


@app.route('/save_model', methods=['POST'])
@cross_origin(supports_credentials=True)
def save_model():
    for file_name in request.files:
        request.files[file_name].save(file_name)
    return '', 200


@app.route('/download/<directory>/<file_path>', methods=['GET'])
@cross_origin(supports_credentials=True)
def download(directory, file_path):
    return send_from_directory(os.path.join('models', directory), file_path)


if __name__ == '__main__':
    app.run(debug=True)
