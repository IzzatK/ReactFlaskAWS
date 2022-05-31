import os
from flask_restx import Namespace,Resource,fields
from flask import request,jsonify,make_response, redirect
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from models import Recipe, User
import random




recipe_ns=Namespace('recipe', description="A namespace for Recipes")

recipe_model=recipe_ns.model(
    "Recipe",
    {
        "id":fields.Integer(),
        "title": fields.String(),
        "description":fields.String(),
        "user_id": fields.Integer(),
        "username": fields.String(),
        # "recipe_file": fields.String()
    }
)

def remove_chars(data, chars):
    new_data = data
    for ch in chars:
        new_data = new_data.replace(ch, '')
    return new_data

@recipe_ns.route('/recipes')
class RecipeResource(Resource):

    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        """Get all recipes"""
        recipes=Recipe.query.all()
        return recipes

    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.expect(recipe_model)
    def post(self):
        """Create a recipe"""
        count = random.randint(1, 99999)
        print(count)
        data=request.get_json()
        useridParseToInt = data.get('user_id')
        # useridfloat = float(useridParseToInt)
        # useridint = int(useridfloat)
        useridnodash = useridParseToInt.replace("-", "")
        useridnoe = useridnodash.replace("e", "")
        useridnoa = useridnoe.replace("a", "")
        useridnof = useridnoa.replace("f", "")
        useridnoc = useridnof.replace("c", "")
        useridnob = useridnoc.replace("b", "")
        # remove_chars(useridParseToInt, '-abcdefghijklmnopqrstuvwxyz')
        # useridnoe = useridnodash.replace('e', '')

        # useridfloat = float(useridnodash)
        # useridint = int(useridfloat)
        new_recipe=Recipe(
            id=count,
            title=data.get('title'),
            description=data.get('description'),
            user_id=useridnob,
             username=data.get('username')
        )

        new_recipe.save()
        return new_recipe,201

# @recipe_ns.route('/recipe/postfile/<int:id>')
# class RecipeResource(Resource):
#     @recipe_ns.marshal_with(recipe_model)
#     def put(self,id):
#         """Update a recipe"""
#         recipe_to_update=Recipe.query.get_or_404(id)
#         file = request.files.getlist("file")
#         print(file)

@recipe_ns.route('/recipe/<int:id>')
class RecipeResource(Resource):

    @recipe_ns.marshal_with(recipe_model)
    def get(self,id):
        """Get recipe by id"""
        recipe=Recipe.query.get(id)

        return recipe

    
    @recipe_ns.marshal_with(recipe_model)
    def put(self,id):
        """Update a recipe"""
        recipe_to_update=Recipe.query.get_or_404(id)
        data=request.get_json()
        resUserID = int(data.get('user_id'))
        #convert the String type to Int, because it's passed into BackEnd from FrontEnd as type String
        user = recipe_to_update.user_id
        # user_id = user.id #use print statements for testing APIs
                         #if userID in localStorage FrontEnd == recipe.user_id
        print(resUserID, user)
        if resUserID != user:
            print('youre not authorized for this action')
        else:
            recipe_to_update.update(data.get('title'), data.get('description'))
            return recipe_to_update


    
    @recipe_ns.marshal_with(recipe_model)
    def delete(self,id):
        """Delete the recipe"""
        recipe_to_delete=Recipe.query.get_or_404(id)
        data=request.get_json()

        resUserID = int(data.get('user_id'))
        user = recipe_to_delete.user_id
        
        if resUserID != user:
            print('youre not authorized for this action')
            return make_response(jsonify({"message":"youre not authorized"}),401)
        else:
            recipe_to_delete.delete()

        return recipe_to_delete

        

@recipe_ns.route("/user/<string:username>")
class RecipeResource(Resource):
    @recipe_ns.marshal_with(recipe_model)
    def get(self, username):
        user = User.query.filter_by(username=username).first_or_404()
        print(user.username) #concatenate the <User AKA first 5 chars, and the > last char
        user_name=user.username
        recipes = Recipe.query.filter_by(username=user.username).all() #grab recipes from PosrgreSQL... use .first() or .all()
        # recipes2 = Recipe.query.filter_by(author=user) #grab recipes from PosrgreSQL
        # recipes3 = Recipe.query.filter_by(username=user.username) #grab recipes from PosrgreSQL

        print(recipes)
        # print(recipes2)
        return recipes



@recipe_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}




