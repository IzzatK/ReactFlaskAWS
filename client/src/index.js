import React from 'react'
import ReactDOM from 'react-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import $ from 'jquery';
// import Popper from 'popper.js';
import NavBar from './components/NavBar';
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './components/Login';
import CreateRecipePage from './components/CreateRecipe';
import RecipePage from './components/RecipePage';

const App = () => {

    // useEffect(
    //     () => {
    //             fetch('/recipe/hello').then(response => response.json()).then(data=>{console.log('data is --->', data); setMessage(data.message)}).catch(err=>console.log(err))
                
    //     },[])
    // const [message, setMessage] = useState("")

    return (
    <BrowserRouter>
            <div className="">
                <NavBar/>
             <Routes>
                <Route path="/" element={<HomePage/>} />
            
                <Route path="/signup" element={<SignUpPage/>} />
                
                <Route path="/login" element={<LoginPage/>} />
                
                <Route path="/create-recipe" element={<CreateRecipePage/>} />

                <Route path="/recipe/recipe/:slug" element={<RecipePage />} />
                
             </Routes>
            </div>
    </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))