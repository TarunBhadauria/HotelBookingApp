import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: null,
    loader: false,
    userData: null,
}

const userSlice = createSlice({
    initialState: initialState,
    name: 'user',
    reducers: {
        setToken(state, value){
            state.token = value.payload;
        },
        setLoader(state, value){
            state.loader = value.payload;
        },
        setUserData(state, value){
            state.userData = value.payload;
        }
    }
})

export const { setToken, setLoader, setUserData } = userSlice.actions;

export default userSlice.reducer;