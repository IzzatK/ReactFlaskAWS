import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';

const RecipePage = ({title, description, user_id, id}) => {
    const [recipe, setRecipe] = useState([]);
    const [file, setFiles] = useState([]);
    const {slug} = useParams();

    useEffect(() => {
        console.log('slug is  ---->', slug);
        fetch(`/recipe/recipe/${slug}`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setRecipe(data); console.log(data);
                                                                    }).catch(err => console.log(err))

    }, [])

    const getPhoto = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFiles(file)
        } //might not need reader.onloadend callback
        reader.readAsDataURL(file);

        console.log('file is -------->', file);

    }

    const pressButton = (e) => {
        e.preventDefault();
        console.log('file is -------->', file);

    }

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
        <Recipe username={recipe.username} id={recipe.id} title={recipe.title} description={recipe.description} user_id={recipe.user_id} />
        <form action='.' enctype="multipart/form-data">
                <input type='file'  onChange={getPhoto}/>
                <button onClick={pressButton}> Get it </button>
              </form>
        </div>
    )
}

export default RecipePage;