import React from 'react';

const Recipe = ({title, description, user_id}) => {
    
    return (
        <dib className='recipe'>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>made by {user_id}</p>
        </dib>
    )
}

export default Recipe;