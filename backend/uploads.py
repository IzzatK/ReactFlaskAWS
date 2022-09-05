import os
from flask import request, redirect
from s3functions import upload_file, show_image
from flask_restx import Namespace, Resource
from werkzeug.utils import secure_filename



UPLOAD_FOLDER = "uploads"
BUCKET="fileiobucket"

upload_ns=Namespace('upload', description="A namespace for uploads")


@upload_ns.route('/upload') #methods=['post']
class UploadResource(Resource):
    def post(self):
            f = request.files['file']
            print(f)
            f.save(os.path.join(UPLOAD_FOLDER, secure_filename(f.filename)))
            upload_file(f"uploads/{f.filename}", BUCKET)
            return "success"

    def get(self):
        contents = show_image(BUCKET)
        print(contents)
        return contents