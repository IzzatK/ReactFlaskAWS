import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import NavBar from './components/NavBar';
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './components/Login';
import CreateRecipePage from './components/CreateRecipe';

const App = () => {

    useEffect(
        () => {
                fetch('/recipe/hello').then(response => response.json()).then(data=>{console.log('data is --->', data); setMessage(data.message)}).catch(err=>console.log(err))
                
        },[])
    const [message, setMessage] = useState("")

    return (
    <Router>
        <div className="container">
          <NavBar />
            <Routes>
                <Route path="/" >
                    <HomePage/>
                </Route>
                <Route path="/signup" >
                    <SignUpPage/>
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/create-recipe">
                    <CreateRecipePage />
                </Route>
            </Routes>
        </div>
    </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))