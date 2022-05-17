import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useForm }from 'react-hook-form'
import { useKeycloak } from 'react-keycloak';
import Notifications, {notify} from 'react-notify-toast';


const RegisterKeycloakUser = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();

    // useEffect(() => {
    //     setUsernameValue(localStorage.getItem("username"));
    //     console.log('username value is ---------->', usernameValue);
    // })

    const submitForm = (data) => {
        
        console.log('email is ------->', data.email, data.firstname, data.lastname, data.password)
        // console.log('username is --> ',data.username)
        // console.log('confirmPassword is --> ',data.confirmPassword)

       
            const body = {
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                password: data.password
                
            }
        const requestOptions = {
            method:"POST",
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(body)
            
        }

         fetch('/auth/user/registerkeycloak', requestOptions)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            notify.show('Toasty!');
          })
          .catch(err=>console.log(err))

    

    // else {
    //     alert("Passwords don't match");
    //     return;
    // }


        // console.log('data is ---->',data);

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
                                  className="form-control"  /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleUsername} name="username" type="text" className="form-control" placeholder="Enter Username" */}
                       
                     {errors.username && (<><span className="text-danger">Username is required</span> <br/></>) }
                     
                     {errors.username?.type==="maxLength" && <span className='text-danger'>Your Username is too long</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>firstname</label>
                         <input {...register("firstname", { maxLength:25})} 
                                  className="form-control"  /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handlefirstname} name="firstname" type="text" className="form-control" placeholder="Enter firstname" */}
                       
                     {errors.firstname && (<><span className="text-danger">firstname is required</span> <br/></>) }
                     
                     {errors.firstname?.type==="maxLength" && <span className='text-danger'>Your firstname is too long</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>lastname</label>
                         <input {...register("lastname", { maxLength:25})} 
                                  className="form-control"  /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handlelastname} name="lastname" type="text" className="form-control" placeholder="Enter lastname" */}
                       
                     {errors.lastname && (<><span className="text-danger">lastname is required</span> <br/></>) }
                     
                     {errors.lastname?.type==="maxLength" && <span className='text-danger'>Your lastname is too long</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>email</label>
                         <input {...register("email", { maxLength:25})} 
                                  className="form-control" /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleemail} name="email" type="text" className="form-control" placeholder="Enter email" */}
                       
                     {errors.email && (<><span className="text-danger">email is required</span> <br/></>) }
                     
                     {errors.email?.type==="maxLength" && <span className='text-danger'>Your email is too long</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>password</label>
                         <input {...register("password", { maxLength:25})} 
                                  className="form-control" /> {/* onChange={handlepassword} name="password" type="password" className="form-control" placeholder="Enter password"- -onChange={handlepassword} name="password" type="text" className="form-control" placeholder="Enter password" */}
                       
                     {errors.password && (<><span className="text-danger">password is required</span> <br/></>) }
                     
                     {errors.password?.type==="maxLength" && <span className='text-danger'>Your password is too long</span>}
                     </div>
                     <button type="submit" className="primary">Sign Up</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Already have an account? <Link to="/login">Click here to Log in</Link></small></div>
                 </form>
             </div>
             
        </div>
    )
}

export default RegisterKeycloakUser