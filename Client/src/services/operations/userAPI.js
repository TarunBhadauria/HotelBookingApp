import { setLoader } from "../../slices/authSlice"
import { objectToFormData } from "../../utils/objectToFormData";
import { userEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { LOGIN_API } = userEndpoints;

export const signIn = (data) => {
    return async (dispatch) => {
        dispatch(setLoader(true));

        const fData = objectToFormData(data);

        try {
            const response = await apiConnector('POST', LOGIN_API, data);

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
}