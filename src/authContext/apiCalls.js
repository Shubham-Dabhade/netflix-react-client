import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";



export const login = async(userCredentials,dispatch)=>{
    dispatch(loginStart);
    try{
        const res = await axios.post("https://netflix-api-nurw.onrender.com/api/auth/login",userCredentials);
        //if success
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure(err));
    }
};  