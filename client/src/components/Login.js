import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../auth';
import {useNavigate} from 'react-router-dom'
import { notify } from 'react-notify-toast';
const LoginPage = () => {


    const {register, handleSubmit, watch, reset, formState:{errors}} = useForm()
    const navigate = useNavigate()
    const {Logged} = useSelector((state) => ({...state}))


    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState();

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

        

        */ /* {setStatus(res.status); res.json()} */ /* working res statement .then(res => res.json()) */
        fetch('/auth/user/loginkeycloak', requestOptions)
             .then(res => 
              {
                   if(!res.ok) throw new Error(res.status)
                    
                   else return res.json();
                
               })
             .then(data => 
              {
                //  let userid = JSON.stringify(data.user_id);
                //  console.log(data.access_token);
                //  login(data.access_token);
                  console.log('data user id is --->', data.id);
                  localStorage.setItem("access_token", data.access_token); localStorage.setItem("refresh_token", data.refresh_token); localStorage.setItem("id", data.id); localStorage.setItem("username", data.username);
                  dispatch({
                    type:'Logged',
                    payload: true,
                });
                  console.log('Logged value is --------->', Logged)
                  window.location.reload();
                  navigate('/');
           }).catch(err => 
             {
                  console.log('err is --------->', err)
                  notify.show("err invalid credentials", "error", 10000);
             })

        reset()
    }

const getSQSMsg = () => {

    const requestOptions = {
        method:"GET",
        headers: {
            'content-type': 'text/xml'
        },

      
    }
    fetch('auth/user/getsqsmsg', requestOptions).then(res => res.json()).then(data => console.log('data is ---------->', data))
                                                .catch(err => console.log(err))
    
                                       
}

const getAllSQSMsgs = () => {

    const requestOptions = {
        method:"GET",
        headers: {
            'content-type': 'text/xml'
        },

      
    }

    fetch('auth/user/getallsqsmsgs', requestOptions).then(res => res.json()).then(data => console.log('data is ---------->', data))
                                                .catch(err => console.log(err))                                             
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
                     {errors.username?.type==="required" && (<><small className='text-warning'>Error username is required {notify.show("Please enter your Username", "warning", 8200)}</small> <br/> </>)}
                     {errors.username?.type === "maxLength" && (<><small className='text-warning'>Error username too long {notify.show("Username is too long!", "warning", 8200)}</small> <br/> </>)}
                     <div className="form-group mb-3">
                         <label className="form-label">Password</label>
                         <input  className="form-control"
                                {...register('password', {required:true, minLength:8})} placeholder="Enter Password"/>
                     </div>
                     {errors.password?.type==="required" && (<><small className='text-warning'>Error password is required {notify.show("Please enter your password", "warning", 8200)}</small> <br/> </>)}
                     {errors.password?.type === "minLength" && (<><small className='text-warning'>Error password is not strong enough {notify.show("Password is too long!", "warning", 8200)}</small> <br/> </>)}

                     <button type="submit" onClick={handleSubmit(loginUser)} className="primary">Log in</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Don't have an account? <Link to="/signup">Click here to register</Link></small></div>
                 </form>
            </div>
            <button onClick={getSQSMsg}>Click to get SQS Msg</button>
            <button onClick={getAllSQSMsgs}>Click to get All SQS Msgs</button>

        </div>
    )
}

export default LoginPage