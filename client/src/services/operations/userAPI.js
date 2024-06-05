import { setLoader } from "../../slices/userSlice";
import { userEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import {toast} from "react-hot-toast";

const { LOGIN_API, SIGNUP_API } = userEndpoints;

export const signIn = (data) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGIN_API, data);

      console.log("Log In RESPONSE ----->", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login successfull");
    } catch (err) {
      console.log("LOG IN ERROR -------->", err);
      toast.error("Error while Logging in");
    }
    dispatch(setLoader(false));
    toast.dismiss(toastId);
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SIGNUP_API, data);
      console.log("SIGN UP RESPONSE------>", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup successfull");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("SIGN UP ERROR ---->", err.response.data.message);
    }

    dispatch(setLoader(false));
    toast.dismiss(toastId);
  };
};
