import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: "",
    isLoggedIn: false,
    userInfo: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload
            if (state.token !== "") state.isLoggedIn = true;
        },
        logout(state) {
            Object.assign(state, initialState);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer