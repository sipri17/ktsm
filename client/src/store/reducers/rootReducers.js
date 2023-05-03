import { combineReducers } from "redux";
import filesReducer from "./filesReducer";



const rootReducer = combineReducers({
     files : filesReducer
}) 

export default rootReducer
