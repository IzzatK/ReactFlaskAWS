from weakref import ref
from flask import Flask, jsonify, request
from flask_restx import Api, Resource
from config import DevConfig
from exts import db
from models import Recipe, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from recipes import recipe_ns
from auth import auth_ns




def create_app(config):
    app=Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)


    api = Api(app)

    api.add_namespace(recipe_ns)
    api.add_namespace(auth_ns)

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