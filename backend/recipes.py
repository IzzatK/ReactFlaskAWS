from flask_restx import Namespace,Resource,fields
from flask import request
from flask_jwt_extended import jwt_required
from models import Recipe



recipe_ns=Namespace('recipe', description="A namespace for Recipes")

recipe_model=recipe_ns.model(
    "Recipe",
    {
        "id":fields.Integer(),
        "title": fields.String(),
        "description":fields.String(),
        "user_id": fields.Integer(),
        "username": fields.String(),
    }
)


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

        data=request.get_json()

        new_recipe=Recipe(
           
            title=data.get('title'),
            description=data.get('description'),
             user_id=data.get('user_id'),
             username=data.get('username')
        )

        new_recipe.save()
        return new_recipe,201

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

        recipe_to_update.update(data.get('title'), data.get('description'))

        return recipe_to_update


    
    @recipe_ns.marshal_with(recipe_model)
    def delete(self,id):
        """Delete the recipe"""
        recipe_to_delete=Recipe.query.get_or_404(id)

        recipe_to_delete.delete()

        return recipe_to_delete

@recipe_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}



