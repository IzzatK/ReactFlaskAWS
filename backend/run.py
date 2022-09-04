from main import create_app
from config import TestConfig, NewConfig, KeycloakConfig #Dev, Test, and NewConfig is working fine

if __name__ == '__main__':
    app=create_app(NewConfig)
    app.run()
