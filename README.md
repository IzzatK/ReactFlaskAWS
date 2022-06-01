# FlaskApp4

python run.py in Backend directory, and npm start in Client directory

Download AWS CLI, launch aws configure (instead of hardcoding access key and secret key values onto each Boto3.Client object), then you can upload/display AWS S3 files to an AWS Root User's services and tools on the cloud

Also must run a Dockerized local Keycloak server, create a realm then inside create client, and create regular user as well as admin user with manage server permissions inside of Keycloak Admin Dashboard (must restart server to log back into Realm server's Admin Dashboard, and now using admin user creds and Realm settings on public access, should be able to authorize all Keycloak API SuperAdmin calls in the Flask BackEnd if you have configured all realm and client settings with case sensitive JSON params in the BackEnd)
