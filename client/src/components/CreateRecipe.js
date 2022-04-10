import React, { useEffect, useState, componentWillMount } from 'react';
import { useForm } from 'react-hook-form';

const CreateRecipePage = () => {
    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userid = localStorage.getItem("id");
        const usersname = localStorage.getItem("username");
        setUserName(usersname)
        setUserID(userid)
        console.log('user ID is ----------->', userID)
        // {register('user_id', {value: userID}, {required:true}) }

        
    })

    
    

    // componentWillMount() {
    //     const userid = localStorage.getItem("id");
    //     setUserID(userid);
    //     console.log('user ID is ----------->', userID);

    // }

    const {register, handleSubmit, reset, formState:{errors}} = useForm()

    // const getUserID = () => {
    //     console.log(localStorage.getItem("id"))
    //     const userid = localStorage.getItem("id");
    //     setUserID(userid)
    //     console.log('user ID is ----------->', userID)
    // }

    const handleSubmitUserID = (e) => {
        e.preventDefault();
        {register('user_id', {value: userID}, {required:true}) }
        {register('username', {value: userName}, {required:true})}

    }

    const createRecipe = (data) => {

        // console.log(userID) value: userID
        //  {register('user_id', {value: userID}, {required:true}) }
         console.log('user ID is ----------->', userID)

        console.log('data title and description, userid, username---->', data.title, data.description, data.user_id, data.username);

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
    return (
        <div className="container create-recipe mb-2 mt-2">
            <h1>Create a Recipe</h1>
            {/* <button onClick={getUserID}>Get user ID</button> */}
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
                <button className="mb-2 "onClick={(e) => handleSubmitUserID(e)}>Confirm post details</button>
                <div className='form-group mt-2'>
                    <button className='btn-sm btn-block btn-primary' onClick={handleSubmit(createRecipe)} type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateRecipePage