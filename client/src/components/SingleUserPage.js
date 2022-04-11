import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';

const SingleUserPage = ({title, description, user_id, id}) => {
    const [recipe, setRecipe] = useState([]);
    const {slug} = useParams();

    useEffect(() => {
        console.log('slug is  ---->', slug);
        fetch(`/recipe/user/${slug}`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setRecipe(data); console.log(data);
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
        <div>Hello, load recipe into useState variables then display it into a RecipeCard</div>
        <Recipe  id={recipe.id} title={recipe.title} description={recipe.description} user_id={recipe.user_id} />
        </div>
    )
}

export default SingleUserPage;