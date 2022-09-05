import os
from flask_restx import Namespace,Resource,fields
from flask import request,jsonify,make_response, redirect
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from models import File, User
import random




file_ns=Namespace('file', description="A namespace for files")

file_model=file_ns.model(
    "file",
    {
        "id":fields.Integer(),
        "title": fields.String(),
        "description":fields.String(),
        "user_id": fields.Integer(30),
        "username": fields.String(),
        # "file_file": fields.String()
    }
)