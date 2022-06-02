from flask_restx import Api,Resource,Namespace, fields
from flask import request,jsonify,make_response
from models import User
import random
import time
import schedule
import json
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required, get_jwt_identity
from keycloak import KeycloakOpenID, KeycloakAdmin
from s3functions import send_sqs_message, get_sqs_message


keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
                    client_id="React-auth",
                    realm_name="keycloak-react-auth"
                    )





                #keycloak_admin.users_count()
                #admin user above must be created within the realm, given admin permissions in credentials/permissions tab, then restart the server


auth_ns=Namespace('auth', description="A namespace for our Auth")



signup_model=auth_ns.model(
    "Signup",
    {
        "username":fields.String(),
        "email":fields.String(),
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
        
        count = random.randint(1, 99999)
        print(count)
        if db_user is not None:
            return jsonify({"message": f"user w/ username {username} already exists"})
        
        #id should be grabbed from localStorage and placed here inside Register function
        new_user=User(
            id=count,
            username=data.get('username'),
            email=data.get('email'),
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
        db_username=db_user.username
        

        if db_user and check_password_hash(db_user.password, password):
            access_token=create_access_token(identity=db_user.username)
            refresh_token=create_refresh_token(identity=db_user.username)

            return jsonify({
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user_id": db_userid,
                "username": db_username
            })

def default_json(t):
     return f'{t}'

@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user=get_jwt_identity()

        new_access_token=create_access_token(identity=current_user)

        return make_response(jsonify({"access_token":new_access_token}),200)


@auth_ns.route('/users')
class UsersResource(Resource):
    def get(self):
        users=User.query.all()
        i = len(users)
        x = 0
        data=[]
        # print(i)
        for user in users:
            data.insert(x, user.username)
            x=x+1
         
            
        return data

@auth_ns.route('/userid/<string:username>')
class UserIDResource(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first_or_404()
        print(user.id)
        return user.id

@auth_ns.route('/user/registerkeycloak')
class UserKeycloak(Resource):
    def post(self):
        keycloak_admin = KeycloakAdmin(server_url="http://localhost:8080/auth/",
                    realm_name="keycloak-react-auth",
                    username="cli-admin",
                    password="getlucky15"
                    )

        users = keycloak_admin.get_users({})
        usersarray = []
        x = 0
        UserExists = False
        #users is an array, but user itself is of type dict; 
        #see examples above for working with dict type
       
        
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        firstName = data.get('firstname')
        lastName = data.get('lastname')
        password = data.get('password')

        for user in users:
            usersarray.insert(x, user.get('username'))
            
            print('username is --------->', usersarray[x])
            if usersarray[x] == username:
                response = make_response(jsonify({"message": "err 409 User already exists"}), 409)
                message = "User already exists, err 409"
                send_sqs_message(message, username)
                return response
            else:
                new_user = keycloak_admin.create_user({"email": email,
                    "username": username,
                    "firstName": firstName,
                    "lastName": lastName,
                    "credentials": [{"value": "secret","type": password,}]})
            x+=1




        
        # token = keycloak_openid.token(username, password)
        # userinfo = keycloak_openid.userinfo(token['access_token'])
        # userid = userinfo.get('sub')

        #create PostgreSQL User here
        


@auth_ns.route('/user/getsqsmsg')
class UserGetSQSMsg(Resource):
    def get(self):
        data = get_sqs_message()
        print('sqs msg is ------------->', data)


@auth_ns.route('/user/loginkeycloak')
class UserLoginKeycloak(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        token = keycloak_openid.token(username, password)
        userinfo = keycloak_openid.userinfo(token['access_token'])
        #userinfo is of type dict as can be seen in print statement below
        # username2 = keycloak_openid.userinfo.name(token['access_token'])
        print('userinfo ---------------->', userinfo.get('preferred_username'))
        userid = userinfo.get('sub')
        # print('type ---------------->', type(userinfo))
        # print('userinfo ---------------->', userinfo)
        # userinpostgre = User.query.filter_by(username=username).first_or_404()
        # print(userinpostgre)

        # if userinpostgre: 
        #     print('hello')
        # else: 
        #     new_user=User(
        #     id=userid,
        #     username=data.get('username'),
        #     email=data.get('email'),
        # )
        
        # new_user.save()
        #new_user,201
        return make_response(jsonify({"access_token":token['access_token'],
                                      "refresh_token":token['refresh_token'],
                                       "username": userinfo.get('preferred_username'),
                                       "id": userinfo.get('sub')          }),207)

        
        #lookup docs for keycloak-python flask package
        # print('get userinfo values', userinfo['username'])



        # print(token)











