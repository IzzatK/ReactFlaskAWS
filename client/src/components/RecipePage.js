import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';
import { useForm } from 'react-hook-form';
import { useKeycloak } from 'react-keycloak';

const RecipePage = ({title, description, user_id, id}) => {
    const [recipe, setRecipe] = useState([]);
    const [titleInput, setTitle] = useState("");
    const [descriptionInput, setDescription] = useState("");


    const [file, setFiles] = useState([]);
    const [fileName, setFileName] = useState("filenamehere");
    const [recipeID, setRecipeID] = useState(0); //this line was giving trouble cause it was outside scope of LoggedInHome funcn
    const [userID, setUserID] = useState("");
    const {keycloak} = useKeycloak();
    const {slug} = useParams();
    //can use localStorage.getItem("username") for DB queries if needed
    useEffect(() => {
        console.log('slug is  ---->', slug);
        fetch(`/recipe/recipe/${slug}`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setRecipe(data); console.log(data);
                                                                    }).catch(err => console.log(err))
fetch(`/auth/userid/${localStorage.getItem("username")}`).then(res => res.json()).then(data => {
              setUserID(data);
             console.log('data is -------->', data);
             localStorage.setItem("id", data)
                }).catch(err => console.log(err))

    }, [])

    const {register, handleSubmit, reset, setValue, formState:{errors}} = useForm()


    const showModal = (id) => {
       
        setRecipeID(id);
        console.log('recipe id is ---------->', recipeID);
        // recipes.map(
        //     (recipe)=>{
        //         if(recipe.id==id){
        //             setValue('title',recipe.title)
        //             setValue('description',recipe.description)
        //         }
        //     }
        // )
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    

    const handleDescription = (e) => {
        console.log(descriptionInput);
        setDescription(e.target.value);
       
    }

    const submitFields = (e) => {
        e.preventDefault();
        {register('title', {value: titleInput}, {required:true} )}
        {register('description', {value: descriptionInput}, {required:true})}
        {register('user_id', {value: userID}, {required:true}) }
    
        

    }

    const submitUserID = (e) => {
        e.preventDefault();
        {register('user_id',{value: userID}, {required:true})}
    }

     const updateRecipe = (data, recipe) => {
           
        // console.log(userID) value: userID
        //  {register('user_id', {value: userID}, {required:true}) }
       
        //  console.log('user ID is ----------->', userID)

        // console.log('data title and description, and userid ---->', data.title, data.description);
      
         console.log('data is  ------->',data);
        console.log(recipe.id);
        console.log(recipeID)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`/recipe/recipe/${recipeID}`, requestOptions).then(res => res.json())
             .then(data => {reset(); window.location.reload()}).catch(err => console.log(err))
    }

    const deleteRecipe = (data, recipe) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`/recipe/recipe/${recipeID}`, requestOptions).then(res => res.json())
             .then(data => {reset(); window.location.reload()}).catch(err => console.log(err))
    }

    const getPhoto = (e) => {
        e.preventDefault();

        // let reader = new FileReader();
        let file = e.target.files[0];

        //  reader.onloadend = () => {
        //      setFiles(file)
        //  } //might not need reader.onloadend callback
        // reader.readAsDataURL(file);

        setFiles(file)

        console.log('file is -------->', file);

    }

    const pressButton = (e) => {
        e.preventDefault();
        console.log('file inside get it is -------->', file);

        const formData = new FormData();
        formData.append("file", file)
        formData.append("fileName", fileName)
        console.log('file form data is  -------->', formData)
        const requestOptions = {
            method: 'POST',
            body: formData
        }

        fetch(`http://localhost:5000/upload/upload`, requestOptions).then(res => res.json()).catch(error => console.log(error))

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
        {/* <div>Hello, load recipe into useState variables then display it into a RecipeCard</div> */}
        <Recipe username={recipe.username} id={recipe.id} title={recipe.title} description={recipe.description} user_id={recipe.user_id} />
        <button type="button" id="updatebutton" onClick={() => showModal(recipe.id)} class="btn btn-warning mr-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                                            Update Recipe
                                            </button>


                                            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Update Recipe</h5>
                                                    <button type="button"  class="close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                              <div class="modal-body">
                                                 <form>
                                                    <div className='form-group mb-2 mt-2'>
                                                        <label>Title</label>
                                                        <input  onChange={handleTitle} value={titleInput} 
                                                        style={{width: '100%'}} className='form-control'  type='text'/>
                                                    </div>
                                                    {errors.titleInput && (<><small>Error title is required</small> <br/> </>)}
                                                    {errors.titleInput?.type === "maxLength" && (<><small>Error title too long</small> <br/> </>)}
                                                    
                                                    <div className='form-floating mt-3'>
                                                        <label>Description</label>
                                                        <textarea onChange={handleDescription} value={descriptionInput}
                                                        style={{height: '107px', width: '100%'}} className='form-control' type='textarea'/>
                                                    </div>
                                                    {errors.descriptionInput && (<><small>Error description is required</small> <br/> </>)}
                                                    {errors.descriptionInput?.type === "maxLength" && (<><small>Error description too long</small> <br/> </>)}
                                                    {/* <div className='form-floating mt-3'>
                                                        <label>Confirm post</label>
                                                        <button  {...register('user_id', localStorage.getItem("id"), {required:true, maxLength:5000})}
                                                        style={{height: '107px', width: '70%'}}  placeholder='confirm'/>
                                                    </div>  */}
                                                    <br/>
                                                    {/* <button className="mb-2 "onClick={(e) => handleSubmitUserID(e)}>Confirm post details</button> */}
                                                    <button className="mb-2 "onClick={(e) => submitFields(e)}>Confirm post details</button>

                                                    <div className='form-group mt-2'>
                                                        <button className='btn-sm btn-block btn-primary' type="submit" onClick={handleSubmit(updateRecipe)}>Save</button>
                                                    </div>
                                                </form>
                                              </div>
                                                
                                                </div>
                                            </div>
                                            </div>

                                            <button type="button" id="deletebutton" onClick={() => showModal(recipe.id)} class="btn btn-danger text-dark ml-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                            delete Recipe
                                            </button>


                                            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
                                                    <button type="button"  class="close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                              <div class="modal-body">
                                                 <form>
                                                 <button className="mb-2 "onClick={(e) => submitUserID(e)}>Confirm post details</button>

                                

                                                    <div className='form-group mt-2'>
                                                        <button className='btn-sm btn-block btn-primary' type="submit" onClick={handleSubmit(deleteRecipe)}>Delete</button>
                                                    </div>
                                                </form>
                                              </div>
                                                
                                                </div>
                                            </div>
                                            </div>



        <form className="mt-2 mb-2" enctype="multipart/form-data" method="post">
               
                <input className="mt-1 mb-1" type="file" name="file" onChange={getPhoto} />
                <button onClick={pressButton}> Get it </button>
              </form>
        </div>
    )
}

export default RecipePage;