import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../../src/styles/main.css'
import Recipe from './Recipe'

const HomePage = () => { /* copy this format to create recipes page user account/profile page. You can pass in field.maps() user_id and recipe_id fields as URL slugs in React Router*/

    const [logged, setLogged] =useState(false);

    const LoggedInHome = () => {
         const [recipes, setRecipes] = useState([]);
         
         useEffect(() => {
            fetch('/recipe/recipes').then(res => res.json()).then(data => 
                  {
                        console.log(data);                     
                         setRecipes(data);
                  }).catch(err => console.log(err))
         }, [])

         return (
             <div>
                 
                 <h1>Welcome user</h1>
                 {
                     recipes.map((recipe) => (
                         <Recipe title={recipe.title} description={recipe.description} user_id={recipe.user_id} />
                     ))
                 }
             </div>
         )
    }


     useEffect(() => {
         var id = localStorage.getItem("id")
        if(typeof id  !== 'undefined' && id !== null)
        {
            setLogged(true)
            console.log('new logged value ------->', logged)
        }
        else 
        {
            setLogged(false)
        }
        console.log('logged value ------->', logged)
    }, [])


    return (
        <div className="home container">
            <h1 id="heading" >Welcome to Recipes Page</h1>
             {logged ?  <LoggedInHome /> : <Link to="/signup" className="btn btn-submit btn-secondary btn-lg">Signup</Link> /* insert username here*/}
        </div>
    )
}

export default HomePage