import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { login } from '../auth';
import {useNavigate} from 'react-router-dom'
const LoginPage = () => {

    const {register, handleSubmit, watch, reset, formState:{errors}} = useForm()
    const navigate = useNavigate()


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = (data) => {
        // console.log("Form submitted");
        // console.log(username, password);

        // setUsername('');
        // setPassword('');
        console.log(data)


        const requestOptions = {
            method:"POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)

          
        }

        /*

        

        */
        fetch('/auth/login', requestOptions).then(res => res.json())
             .then(data => {
                //  console.log(data.access_token);
                //  login(data.access_token);
                 console.log('data user id is --->', data.user_id);
                //  let userid = JSON.stringify(data.user_id);
                  localStorage.setItem("id", data.user_id);
                  localStorage.setItem("username", data.username)
                  window.location.reload();
                  navigate('/');
             }).catch(err => console.log(err))

        reset()
    }

 
    
 
    


    return (
        <div className="container">
            <div className="form">
                <h1>Login Page</h1>
                 <form>
                     <div className="form-group mb-3">
                         <label className="form-label">Username</label>
                         <input  className="form-control"
                                {...register('username', {required:true, maxLength:25})} placeholder="Enter Username"/>
                     </div>
                     {errors.username && (<><small>Error username is required</small> <br/> </>)}
                     {errors.username?.type === "maxLength" && (<><small>Error username too long</small> <br/> </>)}
                     <div className="form-group mb-3">
                         <label className="form-label">Password</label>
                         <input  className="form-control"
                                {...register('password', {required:true, minLength:8})} placeholder="Enter Password"/>
                     </div>
                     {errors.password && (<><small>Error password is required</small> <br/> </>)}
                     {errors.password?.type === "minLength" && (<><small>Error password is not strong enough</small> <br/> </>)}

                     <button type="submit" onClick={handleSubmit(loginUser)} className="primary">Log in</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Don't have an account? <Link to="/signup">Click here to register</Link></small></div>
                 </form>
            </div>
        </div>
    )
}

export default LoginPage