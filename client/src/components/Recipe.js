import React from 'react';

const Recipe = ({title, description, user_id}) => {
    
    return (
        <div className='card mt-4'>
            
            <div className='card-title'><h3>{title}</h3> </div>
            <div className='card-body'>
            <div className='card-text'><p>{description}</p> </div>
            <p>made by {user_id}</p>
            </div>
        </div>
    )
}

export default Recipe;