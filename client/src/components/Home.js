import React, {useEffect, useState} from 'react'
import { useKeycloak } from 'react-keycloak'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../../src/styles/main.css'
import Recipe from './Recipe'
//create a Modal which conditionally renders if recipe.user_id {foreign key AKA reference variable} === localStorage.getItem("key"); AKA currently logged in user is post creator

const HomePage = () => { /* copy this format to create recipes page user account/profile page. You can pass in field.maps() user_id and recipe_id fields as URL slugs in React Router*/

    
    const [logged, setLogged] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const {keycloak} = useKeycloak();

    /*  
    //  const showModal= (id) => {
        //     //  console.log(id);
        //     setRecipeID(id)

        //     //  recipes.map((recipe) => {
        //     //      if(recipe.id==id) {
        //     //          setValue('title', recipe.title);
        //     //          setValue('description', recipe.description);

        //     //      }
        //     //  })

        //      //
        //  }
        
    */

    const LoggedInHome = () => {
         const [recipes, setRecipes] = useState([]);
         const [recipeID, setRecipeID] = useState(0); //this line was giving trouble cause it was outside scope of LoggedInHome funcn
         const [userID, setUserID] = useState("");
         const {register, handleSubmit, reset, setValue, formState:{errors}} = useForm()
         const [title, setTitle] = useState("");
         const [description, setDescription] = useState("");


       

        // const handleTitle = (e) => {
        //     setTitle(e.target.value);
        // }
        

        // const handleDescription = (e) => {
        //     console.log(description);
        //     setDescription(e.target.value);
           
        // }
        

        // const showModal = (id) => {
        //     console.log(id);
        //     setRecipeID(id);
        //     // recipes.map(
        //     //     (recipe)=>{
        //     //         if(recipe.id==id){
        //     //             setValue('title',recipe.title)
        //     //             setValue('description',recipe.description)
        //     //         }
        //     //     }
        //     // )
        // }

        // const submitFields = (e) => {
        //     e.preventDefault();
        //     {register('title', {value: title}, {required:true} )}
        //     {register('description', {value: description}, {required:true})}
        //     {register('user_id', {value: userID}, {required:true}) }
        
            

        // }

        // const submitUserID = (e) => {
        //     e.preventDefault();
        //     {register('user_id',{value: userID}, {required:true})}
        // }

        //  const updateRecipe = (data, recipe) => {
               
        //     // console.log(userID) value: userID
        //     //  {register('user_id', {value: userID}, {required:true}) }
           
        //     //  console.log('user ID is ----------->', userID)
    
        //     // console.log('data title and description, and userid ---->', data.title, data.description);
          
        //      console.log('data is  ------->',data);
        //     console.log(recipe.id);
        //     console.log(recipeID)
        //     const requestOptions = {
        //         method: 'PUT',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     }
    
        //     fetch(`/recipe/recipe/${recipeID}`, requestOptions).then(res => res.json())
        //          .then(data => {reset(); window.location.reload()}).catch(err => console.log(err))
        // }

        // const deleteRecipe = (data, recipe) => {
        //     const requestOptions = {
        //         method: 'DELETE',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     }
    
        //     fetch(`/recipe/recipe/${recipeID}`, requestOptions).then(res => res.json())
        //          .then(data => {reset(); window.location.reload()}).catch(err => console.log(err))
        // }



         
         useEffect(() => {
            fetch('/recipe/recipes').then(res => res.json()).then(data => 
                  {
                        // console.log(data);                     
                         setRecipes(data);
                  }).catch(err => console.log(err))


                //   fetch(`/auth/userid/${keycloak.tokenParsed.preferred_username}`).then(res => res.json()).then(data => {
                //       setUserID(data);
                //       console.log('data is -------->', data);
                //     //   localStorage.setItem("id", data)
                //   }).catch(err => console.log(err))

        // console.log('user ID is ----------->', userID)

        // localStorage.setItem("username", keycloak.tokenParsed.preferred_username)
        // localStorage.setItem("id", userID)

                //   { register('title', {value: title} )}
                //   { register('description', {value: description})}
         }, [])

         return (
             <div>
                 
                 <h1 id="welcomeheader">Welcome user </h1>
             
                 {/* <button onClick={console.log(recipes)}>recipes here</button> */}

                 {
                     recipes.map((recipe, index) => (
                         <>
                                                    { recipe.user_id == localStorage.getItem("id") ? setIsAuthor(true): 'youre not the author' }

                        {/* {isAuthor ? 'youre the author': 'not the author'}  /* above line is for checking auth values and conditl rendering in Python*/}
                       
                         {/* {console.log('recipe user id, and localStorage.getID, and isAuthor ------------>', recipe.user_id, localStorage.getItem("id"), isAuthor)} */}
                         <Recipe key={index} id={recipe.id} title={recipe.title} username={recipe.username} description={recipe.description} user_id={recipe.user_id} />
                
                        </>
                        
                     ))
                     
                 }
             </div>
         )
    }


     useEffect(() => {
         var id = localStorage.getItem("id")
        if(localStorage.getItem("id"))
        {
            setLogged(true)
            // console.log('new logged value ------->', logged, keycloak.tokenParsed)
        }
        else 
        {
            setLogged(false)
        }
        // console.log('logged value ------->', logged)
    }, [])


    return (
        <div className="home container">
            <h1 id="heading" >Welcome to Recipes Page</h1>
             {localStorage.getItem('username') ?  <LoggedInHome /> : <Link to="/signup" className="btn btn-submit btn-secondary btn-lg">Signup</Link> /* insert username here*/}
        </div>
    )
}

export default HomePage