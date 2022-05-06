import { useKeycloak } from 'react-keycloak'
import React, {useEffect, useState} from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../auth'
import '../styles/main.css'
//conditional render the Sign Up header if user.id is saved in localStorage (AKA user is logged in)

const logout = () => {
    localStorage.removeItem("id");
    window.location.reload();
}



const LoggedInLinks = () => {
    return(
        <>
        <ul className="nav navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
            
                <li className="nav-item">
                <Link className="nav-link" to="/create-recipe">Create Recipes</Link>
                </li>
         </ul>
         <ul className="nav navbar-nav navbar-right ms-auto">
                <li className="nav-item " id="allusers">
                <Link className="nav-link " to="/users">All Users</Link>
                </li>
                <li className="nav-item " id="allusers">
                <Link className="nav-link " to="/file/display">See S3 Files</Link>
                </li>
                <li className="nav-item ">
                <button class="btn btn-danger navbar-btn"> <Link className="nav-link text-dark " to="" onClick={logout}>Log Out</Link> </button>
                </li>
         </ul>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
        <ul className="navbar-nav">
        <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item"> 
            <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/login">Log In</Link>
        </li>

       

        </ul>
        </>
    )
}



const NavBar = () => {

    const {keycloak, initialized} = useKeycloak();


    const login = useCallback(() => {
        keycloak.login()
    }, [keycloak])

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
            <Link className="navbar-brand navbar-header" to="/">Recipes Site</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="hover:text-gray-200">
                 {!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={login}
                   >
                     Login
                   </button>
                 )}

                 {!!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.logout()}
                   >
                     Logout ({keycloak.tokenParsed.preferred_username})
                   </button>
                 )}
               </div>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    { logged ? <LoggedInLinks/> : <LoggedOutLinks />} 
                   
                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                   
                </div>

             </div>
            </nav>
        </div>
    )
}

export default NavBar