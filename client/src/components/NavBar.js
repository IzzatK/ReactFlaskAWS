import { useKeycloak } from 'react-keycloak'
import React, {useEffect, useState} from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../auth'
import '../styles/main.css'
//conditional render the Sign Up header if user.id is saved in localStorage (AKA user is logged in)

// const logout = () => {
//     localStorage.removeItem("id");
//     window.location.reload();
// }

const lsUsername = localStorage.getItem("username")




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
                {/* <li className="nav-item ">
                <button class="btn btn-danger navbar-btn"> <Link className="nav-link text-dark " to="" onClick={logout}>Log Out</Link> </button>
                </li> */}
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
            <Link className="nav-link" to="/registerpostgre">Sign Up</Link>
        </li>
      

       

        </ul>
        </>
    )
}



const NavBar = () => {

    const {keycloak, initialized} = useKeycloak();

    
    const login = useCallback(() => {
        keycloak.login();
        // keycloak.login()    .then(res => res.json).then(data =>{ console.log(data);
        //  }).catch(err => console.log(err))
    }, [keycloak])

    const logout = () => {
        keycloak.logout();
        localStorage.removeItem("username");
        // window.location.reload();
    }

     const [logged, setLogged] =useState(false);

     useEffect(() => {

     })


    //  useEffect(() => {
    //      var id = localStorage.getItem("id")
    //     if(keycloak.tokenParsed) // keycloak.tokenParsed.preferred_username
    //     {
    //         setLogged(true);
    //         console.log('logged value ------->', logged, keycloak.authenticated)

    //     }
    //     else 
    //     {
    //         setLogged(false)
    //         console.log('logged value ------->', logged, keycloak.authenticated)
    //         const count = 1;
    //         const i = 0
    //         while (i < count) {
    //            window.location.reload();

    //         }
           

    //     }
    //     // console.log('logged value ------->', logged, keycloak.authenticated)
        


    // }, [])

    // useEffect(() => {
        
    // })

    // componentDidMount = () => {
    //     if(!!keycloak.authenticated) 
    //     {
    //             console.log('hello');
    //     }
    //     else 
    //     {
    //         console.log('youre not authenticated in')
    //     }
    // }

    const consoleLog = () => {
        console.log(keycloak.authenticated);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <div className="container-fluid">
            <Link className="navbar-brand navbar-header" to="/">Recipes Site</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
        {/* {  !!keycloak.authenticated ?
        
            setLogged(true);
            console.log('logged value ------->', logged, keycloak.authenticated) : 'none'

        } */}
        {/* {!!keycloak.authenticated ? (setLogged(true)) : ('none')} */}

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
                   <Link
                     to='/logout'
                     className="text-blue-800"
                     onClick={logout}
                   >
                       {/* {keycloak.} */}
                     Logout ({keycloak.tokenParsed.preferred_username})
                   </Link>
                 )}
               </div>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    { !!keycloak.authenticated ? <LoggedInLinks/> : <LoggedOutLinks />} 
                   
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