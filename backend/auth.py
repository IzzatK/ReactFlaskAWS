from flask_restx import Api,Resource,Namespace, fields
from flask import request,jsonify,make_response
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required

auth_ns=Namespace('auth', description="A namespace for our Auth")

signup_model=auth_ns.model(
    "Signup",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model=auth_ns.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)



@auth_ns.route('/signup')
class SignUp(Resource):

    
    @auth_ns.expect(signup_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')

        db_user=User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message": f"user w/ username {username} already exists"})

        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        
        new_user.save()
        #new_user,201
        return make_response(jsonify({"message":"user created successfully"}),201)

@auth_ns.route('/login')
class Login(Resource):
    
    @auth_ns.expect(login_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')

        db_user=User.query.filter_by(username=username).first()
        db_userid=db_user.id

        if db_user and check_password_hash(db_user.password, password):
            access_token=create_access_token(identity=db_user.username)
            refresh_token=create_refresh_token(identity=db_user.username)

            return jsonify({
                "access token": access_token,
                "refresh_token": refresh_token,
                "user_id": db_userid
            })