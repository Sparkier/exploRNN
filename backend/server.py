from flask import Flask, request
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import ImmutableMultiDict

app = Flask(__name__)


@app.route('/save_model', methods=['POST'])
@cross_origin(supports_credentials=True)
def save_model():
    for file_name in request.files:
        request.files[file_name].save(file_name)
    return '', 200


if __name__ == '__main__':
    app.run(debug=True)
