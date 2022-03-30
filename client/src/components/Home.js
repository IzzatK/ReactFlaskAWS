import React from 'react'
import { Link } from 'react-router-dom'
import '../../src/styles/main.css'

const HomePage = () => {
    return (
        <div className="home container">
            <h1 id="heading" >Welcome to Recipes Page</h1>
             <Link to="/signup" className="btn btn-submit btn-secondary btn-lg">Signup</Link>
        </div>
    )
}

export default HomePage