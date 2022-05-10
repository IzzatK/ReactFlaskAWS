import React from 'react'
import ReactDOM from 'react-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import $ from 'jquery';
// import Popper from 'popper.js';
import NavBar from './components/NavBar';
import {Provider} from 'react-redux'
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import {KeycloakProvider} from 'react-keycloak'
import keycloak from './keycloak'
import LoginPage from './components/Login';
import CreateRecipePage from './components/CreateRecipe';
import RecipePage from './components/RecipePage';
import AllUsersPage from './components/AllUsersPage';
import SingleUserPage from './components/SingleUserPage';
import FileDisplayPage from './components/FileDisplayPage'
import SingleFilePage from './components/SingleFilePage';
import ProtectedRoute from './helpers/ProtectedRoute'
import Secured from './pages/Securedpage';
import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './helpers/indexRedux';
import { userReducer } from './helpers/userReducer';
import RegisterPage from './components/RegisterPage';

const keycloakProviderInitConfig = {
   onLoad: 'check-sso',
 }

const App = () => {
   const store = configureStore({reducer: {
      user: userReducer
   }})

   const eventLogger = (event ,error) => {
      console.log('onKeycloakEvent', event, error)
    }
    
    const tokenLogger = (tokens) => {
      console.log('onKeycloakTokens', tokens)
      localStorage.setItem("token", tokens.idToken) //idToken, refreshToken, and token fields

      //dispatch the tokens and into userReducer and username into LocalStorage using similar logic in 
      //Washdapp MERN stack
    }

    // useEffect(
    //     () => {
    //             fetch('/recipe/hello').then(response => response.json()).then(data=>{console.log('data is --->', data); setMessage(data.message)}).catch(err=>console.log(err))
                
    //     },[])
    // const [message, setMessage] = useState("")

    return (
<KeycloakProvider onEvent={eventLogger} onTokens={tokenLogger}
initOptions={{ onLoad: 'login-required' }} keycloak={keycloak}>
   <Provider store={store}>
      <BrowserRouter>
                  <NavBar/>
               <Routes>
                  <Route path="/" element={<HomePage/>} />
               
                  <Route path="/signup" element={<SignUpPage/>} />
                  
                  <Route path="/login" element={<LoginPage/>} />
                  
                  <Route path="/create-recipe" element={<CreateRecipePage/>} />

                  <Route path="/recipe/recipe/:slug" element={<RecipePage />} />

                  <Route path="/users" element={<AllUsersPage/>} />

                  <Route path="/user/:slug" element={<SingleUserPage/>} />

                  <Route path="/file/display" element={<ProtectedRoute><FileDisplayPage /></ProtectedRoute>} />

                  <Route path={`/singlefile/:slug`} element={<SingleFilePage />} />

                  <Route path="/securedpage" element={<ProtectedRoute><Secured /> </ProtectedRoute>} />

                  <Route path="/registerpostgre" element={<ProtectedRoute><RegisterPage /> </ProtectedRoute>} />




                  
               </Routes>
      </BrowserRouter>
   </Provider>
</KeycloakProvider>
    )
}

ReactDOM.render( <App/> , document.getElementById('root'))