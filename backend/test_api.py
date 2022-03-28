import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app=create_app(TestConfig)
        self.client=self.app.test_client()

        with self.app.app_context():
            db.init_app(self.app)

            db.create_all()


    def test_hello_world(self):
        hello_response=self.client.get('/recipe/hello')

        json=hello_response.json

        print(json)

        # self.assertEqual(json, {"message": "Hello World"} )

    def test_signup(self):
        signup_response=self.client.post('/auth/signup',
            json={"username": "testuser", "email": "testuser@test.com", "password":"password"}
        )

        status_code=signup_response.status_code
        self.assertEqual(status_code, 201)

    
    def test_login(self):

        signup_response=self.client.post('/auth/signup',
            json={"username": "testuser", "email": "testuser@test.com", "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username": "testuser","password":"password"}
        )

        json=login_response.json
        # print(json)

        status_code=login_response.status_code
        self.assertEqual(status_code, 200)

    def test_get_all_recipes(self):
        """TEST GET ALL RECIPES"""
        recipe=self.client.get('/recipe/recipes')

        status_code=recipe.status_code
        self.assertEqual(status_code, 200)

        print(recipe.json)

    def test_get_one_recipe(self):
        id=1
        response=self.client.get(f'/recipe/recipe/{id}')

        status_code=response.status_code
        self.assertEqual(status_code, 404)


    def test_create_recipe(self):
        signup_response=self.client.post('/auth/signup',
            json={"username": "testuser", "email": "testuser@test.com", "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username": "testuser","password":"password"}
        )

        access_token=(login_response.json["access token"])

        create_recipe_response=self.client.post('/recipe/recipes',
            json={
                "title": "dijon chicken",
                "description": "classic French cuisine"
            },
            headers={
                "Authorization":f"Bearer {access_token} "
            }
        )
        # print(create_recipe_response.json)
        status_code = create_recipe_response.status_code
        self.assertEqual(status_code, 201)

    def test_update_recipe(self):
        signup_response=self.client.post('/auth/signup',
            json={"username": "testuser", "email": "testuser@test.com", "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username": "testuser","password":"password"}
        )
        id=1
        access_token=(login_response.json["access token"])
        # get_one=self.client.get('/recipe/recipe/{id}')

        # print(get_one.json)

        create_recipe_response=self.client.post('/recipe/recipes',
            json={
                "title": "dijon chicken",
                "description": "classic French cuisine"
            },
            headers={
                "Authorization":f"Bearer {access_token} "
            }
        )

        update_response=self.client.put(f'/recipe/recipe/{id}',
            json= {
                "title": "dijon chicken 2",
                "description": "classic French cuisine 2"
            },
            headers={
                "Authorization":f"Bearer {access_token} "
            }
            
        )

        # status_code=update_response.status_code
        # self.assertEqual(status_code, 200)
        # print(update_response.json)


      

  
    def test_delete_recipe(self):
        signup_response=self.client.post('/auth/signup',
            json={"username": "testuser", "email": "testuser@test.com", "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username": "testuser","password":"password"}
        )
        id=1
        access_token=(login_response.json["access token"])
        # get_one=self.client.get('/recipe/recipe/{id}')

        # print(get_one.json)

        create_recipe_response=self.client.post('/recipe/recipes',
            json={
                "title": "dijon chicken",
                "description": "classic French cuisine"
            },
            headers={
                "Authorization":f"Bearer {access_token} "
            }
        )

        delete_response=self.client.delete(f'/recipe/recipe/{id}',
             headers={
                "Authorization":f"Bearer {access_token} "
            }
        )
        status_code=delete_response.status_code
        self.assertEqual(status_code, 200)
    

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()
