import React from 'react'
import { Link } from 'react-router-dom'
//conditional render the Sign Up header if user.id is saved in localStorage (AKA user is logged in)

const NavBar = () => {


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <div className="container-fluid">
            <Link className="navbar-brand" to="/">Recipes Site</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item"> 
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Log In</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" to="/create-recipe">Create Recipes</a>
                    </li>
                    <li>
                        <Link className="nav-link active" to="">Log Out</Link>
                    </li>
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