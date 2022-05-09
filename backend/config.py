import os
from decouple import config 



class Config:
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS=config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI="postgresql://postgres@localhost/recipeapp"
    DEBUG=True
    SQLALCHEMY_ECHO=True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI="postgresql://postgres@localhost/finalrecipesapp"
    # SQLALCHEMY_ECHO=True
    DEBUG=True


class NewConfig(Config):
    SQLALCHEMY_DATABASE_URI="postgresql://postgres:getlucky15@localhost/finalrecipesapp2"
    # SQLALCHEMY_ECHO=True
    DEBUG=True

class KeycloakConfig(Config):
    SQLALCHEMY_DATABASE_URI="postgresql://postgres:getlucky15@localhost/keycloakrecipeapp"
    # SQLALCHEMY_ECHO=True
    DEBUG=True




