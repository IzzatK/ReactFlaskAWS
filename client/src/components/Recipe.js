import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({title, description, user_id, id}) => {
   
    return (
        <div className='card mt-4'>
            
            <Link to={`/recipe/recipe/${id}`} className='card-title'><h3>{title}</h3> </Link>
            <div className='card-body'>
            <div className='card-text'><p>{description}</p> </div>
            <p>made by {user_id}</p>
            </div>
        </div>
    )
}

export default Recipe;