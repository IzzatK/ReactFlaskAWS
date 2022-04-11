import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css'

const Recipe = ({title, description, user_id, username, id}) => {
   
    return (
        <div className='card mt-4' id="recipecard">
            
            <Link to={`/recipe/recipe/${id}`} id="recipetitle" className='card-title'><h3>{title}</h3> </Link>
            <div className='card-body'>
            <div className='card-text'><p>{description}</p> </div>
            <Link to ={`/user/${user_id}`} > <p>made by {username}</p> </Link>
            </div>
        </div>
    )
}

export default Recipe;