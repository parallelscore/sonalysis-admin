import { combineReducers } from "redux";
import example from "./example";
import profile from "./profile";
import upload from "./upload"
import location from "./locations"



export default combineReducers({
   // reducers here
   location,
   upload,
   profile,
   example
});