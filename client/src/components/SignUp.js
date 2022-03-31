import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useForm }from 'react-hook-form'

const SignUpPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();


    const submitForm = (data) => {
        
    
        // console.log('username is --> ',data.username)
        // console.log('confirmPassword is --> ',data.confirmPassword)

        if (data.password === data.confirmPassword) {
            const body = {
                username: data.username,
                email: data.email,
                password: data.password,
                
            }
        const requestOptions = {
            method:"POST",
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(body)
            

        }
        fetch('/auth/signup', requestOptions)
         .then(res => res.json())
         .then(data => console.log(data))
         .catch(err=>console.log(err))

    }

    else {
        alert("Passwords don't match");
        return;
    }


        console.log('data is ---->',data);

        reset()
    }



          // console.log("Form submitted");
        // console.log(username, email, password, confirmPassword);

        // setUsername('');
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
    

    // console.log(watch("username"));
    // console.log(watch("email"))
    // console.log(watch("password"))

    // const handleUsername = (e) => 
    //     setUsername(e.target.value);
    
    // const handleEmail = (e) => 
    //     setEmail(e.target.value);
    
    // const handlePassword = (e) => 
    //     setPassword(e.target.value);
    
    // const handleConfirmPassword = (e) => 
    //     setConfirmPassword(e.target.value);
    



    return (
        <div className="container">

             <div className="form">
                <h1>SignUp Page</h1>
                 <form onSubmit={handleSubmit(submitForm)}>
                     <div className="form-group mb-3">
                         <label>Username</label>
                         <input {...register("username", {required:true, maxLength:25})} 
                                  className="form-control" placeholder="Enter Username"/> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleUsername} name="username" type="text" className="form-control" placeholder="Enter Username" */}
                       
                     {errors.username && (<><span className="text-danger">Username is required</span> <br/></>) }
                     
                     {errors.username?.type==="maxLength" && <span className='text-danger'>Your Username is too long</span>}
                     </div>
                   
                     <div className="form-group mb-3">
                         <label>Email</label>
                         <input {...register("email", {required:true, maxLength:45})}
                                  className="form-control" placeholder="Enter Email"/>
                                   {/** use RegEx to confirm that it's a valid email */}
                     {errors.email && <small className="text-danger">Email is required</small>}
                     <br/>
                     {errors.email?.type==="maxLength" && <small className='text-danger'>Your Email is too long</small>}
                     </div>
                     <div className="form-group mb-3">
                         <label>Password</label>
                         <input  {...register("password", {required:true, minLength:8})}
                                 className="form-control" placeholder="Enter Password"/>
                         
                     {errors.password && (<><small className="text-danger">Password is required</small> <br/></> )} 
                     
                     {errors.password?.type==="minLength" && <small className='text-danger'>Password is not strong enough</small>}
                     </div>
                     <div className="form-group mb-3">
                         <label>confirm-password</label>
                         <input {...register("confirmPassword", {required:true, minLength:8})}
                                className="form-control" placeholder="Enter Confirm Password"/>
                                  
                     {errors.confirmPassword && (<><small className="text-danger">Confirm Password is required</small> <br/> </>)}
                     <br/>
                     {errors.confirmPassword?.type==="maxLength" && <small className='text-danger'>Password is not strong enough</small>}
                     </div>
                     <button type="submit" className="primary">Sign Up</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Already have an account? <Link to="/login">Click here to Log in</Link></small></div>
                 </form>
             </div>
             
        </div>
    )
}

export default SignUpPage