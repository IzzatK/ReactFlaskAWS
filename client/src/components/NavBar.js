import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../auth'
//conditional render the Sign Up header if user.id is saved in localStorage (AKA user is logged in)

const logout = () => {
    localStorage.removeItem("id");
    window.location.reload();
}


const LoggedInLinks = () => {
    return(
        <>
           <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li>
              <Link className="nav-link active" to="" onClick={logout}>Log Out</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-recipe">Create Recipes</Link>
            </li>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
        <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item"> 
            <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/login">Log In</Link>
        </li>
        </>
    )
}

const NavBar = () => {

     const [logged, setLogged] =useState(false);


     useEffect(() => {
         var id = localStorage.getItem("id")
        if(typeof id  !== 'undefined' && id !== null)
        {
            setLogged(true)
        }
        else 
        {
            setLogged(false)
        }
        console.log('logged value ------->', logged)
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <div className="container-fluid">
            <Link className="navbar-brand" to="/">Recipes Site</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    { logged ? <LoggedInLinks/> : <LoggedOutLinks />} 
                   
                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                    </ul>
                </div>
             </div>
            </nav>
        </div>
    )
}

export default NavBar