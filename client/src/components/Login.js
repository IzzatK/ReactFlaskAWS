import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../auth';
import {useNavigate} from 'react-router-dom'
const LoginPage = () => {


    const {register, handleSubmit, watch, reset, formState:{errors}} = useForm()
    const navigate = useNavigate()
    const {Logged} = useSelector((state) => ({...state}))


    const dispatch = useDispatch();
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
        fetch('/auth/user/loginkeycloak', requestOptions).then(res => res.json())
             .then(data => {
                //  console.log(data.access_token);
                //  login(data.access_token);
                 console.log('data user id is --->', data.id);
                //  let userid = JSON.stringify(data.user_id);
                  localStorage.setItem("access_token", data.access_token);
                  localStorage.setItem("refresh_token", data.refresh_token)
                  localStorage.setItem("id", data.id);
                  localStorage.setItem("username", data.username)
                  dispatch({
                    type:'Logged',
                    payload: true,
                });
                console.log('Logged value is --------->', Logged)
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