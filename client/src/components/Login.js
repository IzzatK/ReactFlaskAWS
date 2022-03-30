import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {
        console.log("Form submitted");
        console.log(username, password,);

        setUsername('');
        setPassword('');
    }

    const handleUsername = (e) => 
        setUsername(e.target.value);

    const handlePassword = (e) => 
        setPassword(e.target.value);
    
 
    


    return (
        <div className="container">
            <div className="form">
                <h1>Login Page</h1>
                 <form>
                     <div className="form-group mb-3">
                         <label className="form-label">Username</label>
                         <input value={username} 
                                onChange={handleUsername} name="username" type="text" className="form-control" placeholder="Enter Username"></input>
                     </div>
                     <div className="form-group mb-3">
                         <label className="form-label">Password</label>
                         <input value={password} 
                                onChange={handlePassword} name="password" type="password" className="form-control" placeholder="Enter Password"></input>
                     </div>
                   
                     <button type="submit" onClick={loginUser} className="primary">Sign Up</button> {/* Buttons submission in React will refresh the page*/}
                     <div className="form-group mt-2"><small>Don't have an account? <Link to="/signup">Click here to register</Link></small></div>
                 </form>
            </div>
        </div>
    )
}

export default LoginPage