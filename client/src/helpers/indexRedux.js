import { combineReducers } from "redux";
import { loggedReducer } from "./loggedReducer";


const rootReducer = combineReducers({
     Logged: loggedReducer
})

export default rootReducer