import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../../src/styles/main.css'
import Recipe from './Recipe'
//create a Modal which conditionally renders if recipe.user_id {foreign key AKA reference variable} === localStorage.getItem("key"); AKA currently logged in user is post creator

const HomePage = () => { /* copy this format to create recipes page user account/profile page. You can pass in field.maps() user_id and recipe_id fields as URL slugs in React Router*/

    const [logged, setLogged] =useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    const LoggedInHome = () => {
         const [recipes, setRecipes] = useState([]);

         const updateRecipe = (data) => {

            // console.log(userID) value: userID
            //  {register('user_id', {value: userID}, {required:true}) }
            //  console.log('user ID is ----------->', userID)
    
            console.log('data title and description, and userid ---->', data.title, data.description, data.user_id);
    
            const requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
    
            fetch('/recipe/recipes', requestOptions).then(res => res.json())
                 .then(data => reset()).catch(err => console.log(err))
        }

         const {register, handleSubmit, reset, formState:{errors}} = useForm()


         
         useEffect(() => {
            fetch('/recipe/recipes').then(res => res.json()).then(data => 
                  {
                        console.log(data);                     
                         setRecipes(data);
                  }).catch(err => console.log(err))

                  
         }, [])

         return (
             <div>
                 
                 <h1 id="welcomeheader">Welcome user</h1>
             
                 {/* <button onClick={console.log(recipes)}>recipes here</button> */}

                 {
                     recipes.map((recipe) => (
                         <>
                                                    { recipe.user_id == localStorage.getItem("id") ? setIsAuthor(true): 'none' }

                        {/* {isAuthor ? 'youre the author': 'not the author'}  /* above line is for checking auth values and conditl rendering in Python*/}
                       
                         {console.log('recipe user id, and localStorage.getID, and isAuthor ------------>', recipe.user_id, localStorage.getItem("id"), isAuthor)}
                         <Recipe title={recipe.title} description={recipe.description} user_id={recipe.user_id} />
                         {isAuthor
                                   ? 
                                        <>
                                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Update Recipe
                                            </button>


                                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Update Recipe</h5>
                                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                              <div class="modal-body">
                                                 <form>
                                                    <div className='form-group mb-2 mt-2'>
                                                        <label>Title</label>
                                                        <input {...register('title', {required:true, maxLength:30})}
                                                        style={{width: '70%'}} className='form-control' type='text'/>
                                                    </div>
                                                    {errors.title && (<><small>Error title is required</small> <br/> </>)}
                                                    {errors.title?.type === "maxLength" && (<><small>Error title too long</small> <br/> </>)}
                                                    
                                                    <div className='form-floating mt-3'>
                                                        <label>Description</label>
                                                        <textarea {...register('description', {required:true, maxLength:5000})}
                                                        style={{height: '107px', width: '70%'}} className='form-control' type='textarea'/>
                                                    </div>
                                                    {errors.description && (<><small>Error description is required</small> <br/> </>)}
                                                    {errors.description?.type === "maxLength" && (<><small>Error description too long</small> <br/> </>)}
                                                    {/* <div className='form-floating mt-3'>
                                                        <label>Confirm post</label>
                                                        <button  {...register('user_id', localStorage.getItem("id"), {required:true, maxLength:5000})}
                                                        style={{height: '107px', width: '70%'}}  placeholder='confirm'/>
                                                    </div>  */}
                                                    <br/>
                                                    {/* <button className="mb-2 "onClick={(e) => handleSubmitUserID(e)}>Confirm post details</button> */}
                                                    <div className='form-group mt-2'>
                                                        <button className='btn-sm btn-block btn-primary' onClick={handleSubmit(updateRecipe)} type="submit">Save</button>
                                                    </div>
                                                </form>
                                              </div>
                                                <div class="modal-footer">
                                                    {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </>
                                    :       
            
    <> </>}
                        </>
                        
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