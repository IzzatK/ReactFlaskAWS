from weakref import ref
from flask import Flask, jsonify, request
from flask_restx import Api, Resource
from config import TestConfig
from exts import db
from models import Recipe, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from recipes import recipe_ns
from auth import auth_ns
from uploads import upload_ns
from flask_cors import CORS



def create_app(config):
    app=Flask(__name__)
    app.config.from_object(config)
    CORS(app)
    db.init_app(app)

    with app.app_context(): #this line was giving lots of trouble
     db.create_all()
   
    migrate = Migrate(app, db)
    JWTManager(app)


    api = Api(app)

    api.add_namespace(recipe_ns)
    api.add_namespace(auth_ns)
    api.add_namespace(upload_ns)

    #model (serializer)

    @app.shell_context_processor
    def make_shell_context():
            return {
                "db":db,
                "Recipe":Recipe,
                "user": User
            }

  
    return app























# if __name__ == '__main__':
#     app.run()