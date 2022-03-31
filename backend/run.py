from main import create_app
from config import TestConfig #DevConfig is working fine

if __name__ == '__main__':
    app=create_app(TestConfig)
    app.run()
