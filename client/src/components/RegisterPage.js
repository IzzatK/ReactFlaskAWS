import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useForm }from 'react-hook-form'
import { useKeycloak } from 'react-keycloak';

const RegisterPage = () => {

    const [usernameValue, setUsernameValue] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {keycloak} = useKeycloak();

    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();

    useEffect(() => {
        setUsernameValue(localStorage.getItem("username"));
        console.log('username value is ---------->', usernameValue);
    })

    const submitForm = (data) => {
        
    
        // console.log('username is --> ',data.username)
        // console.log('confirmPassword is --> ',data.confirmPassword)

       
            const body = {
                username: usernameValue,
                email: keycloak.tokenParsed.email,
                
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

    

    // else {
    //     alert("Passwords don't match");
    //     return;
    // }


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
                         <input {...register("username", { maxLength:25})} 
                                  className="form-control" placeholder={usernameValue} /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleUsername} name="username" type="text" className="form-control" placeholder="Enter Username" */}
                       
                     {errors.username && (<><span className="text-danger">Username is required</span> <br/></>) }
                     
                     {errors.username?.type==="maxLength" && <span className='text-danger'>Your Username is too long</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>email</label>
                         <input {...register("email", { maxLength:25})} 
                                  className="form-control" placeholder={keycloak.tokenParsed.email}/> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleemail} name="email" type="text" className="form-control" placeholder="Enter email" */}
                       
                     {errors.email && (<><span className="text-danger">email is required</span> <br/></>) }
                     
                     {errors.email?.type==="maxLength" && <span className='text-danger'>Your email is too long</span>}
                     </div>
                     <button type="submit" className="primary">Sign Up</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Already have an account? <Link to="/login">Click here to Log in</Link></small></div>
                 </form>
             </div>
             
        </div>
    )
}

export default RegisterPage