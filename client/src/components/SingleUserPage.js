import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';

const SingleUserPage = ({title, description, user_id, id}) => {
    const [recipes, setRecipes] = useState([]);
    const {slug} = useParams();
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        console.log('slug is  ---->', slug);
        fetch(`/recipe/user/${slug}`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setRecipes(data); console.log(data);
                                                                    }).catch(err => console.log(err))

    }, [])

    

    // useEffect(() => {
    //     fetch(`/recipe/recipe/${slug}`).then(res => res.json()).then(data => 
    //           {
    //                 // console.log(data);                     
    //                  setRecipe(data);
    //           }).catch(err => console.log(err))
    //         //   { register('title', {value: title} )}
    //         //   { register('description', {value: description})}
    //  }, [])
   
    return (
        <div className='container'>
       {
                     recipes.map((recipe, index) => (
                         <>

                        {/* {isAuthor ? 'youre the author': 'not the author'}  /* above line is for checking auth values and conditl rendering in Python*/}
                       
                         {/* {console.log('recipe user id, and localStorage.getID, and isAuthor ------------>', recipe.user_id, localStorage.getItem("id"), isAuthor)} */}
                         <Recipe key={index} id={recipe.id} title={recipe.title} username={recipe.username} description={recipe.description} user_id={recipe.user_id} />
                   
                        </>
                        
                     ))
                     
                 }
        </div>
    )
}

export default SingleUserPage;