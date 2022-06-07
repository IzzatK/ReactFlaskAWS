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

    useEffect(() => {

    }, [])

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
          .then(res => {
            if(!res.ok) throw new Error(res.status)
                    
            else return res.json();
          })
          .then(data => {
            console.log(data);
            notify.show('Toasty! Successfull registration', "success", 10000);
          })
          .catch(err=> {
            console.log(err);
            notify.show(`${err}: User already exists `, "error", 10000);
            })

    

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
                         <input {...register("username", { maxLength:25, required: true})} 
                                  className="form-control"  /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleUsername} name="username" type="text" className="form-control" placeholder="Enter Username" */}
                       
                     {errors.username?.type==="required" && (<><span className="text-warning">Username is required {notify.show("Please enter your Username!", "warning", 8570)}</span> <br/></>) }
                     
                     {errors.username?.type==="maxLength" && <span className='text-warning'>Your Username is too long {notify.show("Username is too long!", "warning", 9570)}</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>firstname</label>
                         <input {...register("firstname", { maxLength:25, required: true})} 
                                  className="form-control"  /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handlefirstname} name="firstname" type="text" className="form-control" placeholder="Enter firstname" */}
                       
                     {errors.firstname?.type==="required" && (<><span className="text-warning">firstname is required {notify.show("Please enter your First name", "warning", 8570)}</span> <br/></>) }
                     
                     {errors.firstname?.type==="maxLength" && <span className='text-warning'>Your firstname is too long {notify.show("First name is too long!", "warning", 9570)} </span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>lastname</label>
                         <input {...register("lastname", { maxLength:25, required:true })} 
                                  className="form-control"  /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handlelastname} name="lastname" type="text" className="form-control" placeholder="Enter lastname" */}
                       
                     {errors.lastname?.type==="required" && (<><span className="text-warning">lastname is required {notify.show("Please enter your Last name", "warning", 8570)}</span> <br/></>) }
                     
                     {errors.lastname?.type==="maxLength" && <span className='text-warning'>Your lastname is too long {notify.show("Last name is too long!", "warning", 9570)}</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>email</label>
                         <input {...register("email", { maxLength:25, required: true})} 
                                  className="form-control" /> {/* onChange={handleEmail} name="email" type="email" className="form-control" placeholder="Enter Email"- -onChange={handleemail} name="email" type="text" className="form-control" placeholder="Enter email" */}
                       
                     {errors.email?.type==="required" && (<><span className="text-warning">email is required {notify.show("Please enter your email", "warning", 8570)}</span> <br/></>) }
                     
                     {errors.email?.type==="maxLength" && <span className='text-warning'>Your email is too long {notify.show("Email is too long!", "warning", 9570)}</span>}
                     </div>
                     <div className="form-group mb-3">
                         <label>password</label>
                         <input {...register("password", { maxLength:25, required: true})} 
                                  className="form-control" /> {/* onChange={handlepassword} name="password" type="password" className="form-control" placeholder="Enter password"- -onChange={handlepassword} name="password" type="text" className="form-control" placeholder="Enter password" */}
                       
                     {errors.password?.type==="required" && (<><span className="text-warning">password is required {notify.show("Please enter your password", "warning", 8570)}</span> <br/></>) }
                     
                     {errors.password?.type==="maxLength" && <span className='text-warning'>Your password is too long {notify.show("Password is too long!", "warning", 9570)}</span>}
                     </div>
                     <button type="submit" className="primary">Sign Up</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Already have an account? <Link to="/login">Click here to Log in</Link></small></div>
                 </form>
             </div>
             
        </div>
    )
}

export default RegisterKeycloakUser