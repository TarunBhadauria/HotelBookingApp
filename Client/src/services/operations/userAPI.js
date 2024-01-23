import { setLoader } from "../../slices/userSlice"
import { userEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { LOGIN_API, SIGNUP_API } = userEndpoints;

export const signIn = (data) => {
    return async (dispatch) => {
        dispatch(setLoader(true));

        try {
            const response = await apiConnector('POST', LOGIN_API, data);

            console.log(response);
        } catch (err) {
            console.log(err);
        }

        dispatch(setLoader(false));
    }
}

export const signup = (data)=>{
    return async (dispatch)=>{
        dispatch(setLoader(true));

        try{
            const response = await apiConnector('POST', SIGNUP_API, data);

            console.log(response);
        }catch(err){
            console.log(err);
        }

        dispatch(setLoader(false));
    }
}