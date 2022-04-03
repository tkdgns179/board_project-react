import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        loginModalIsShown: false,
        signupModalIsShown: false,
    },
    reducers: {
        loginModalTrigger(state) {
            state.loginModalIsShown = !state.loginModalIsShown
        },
        SignupModalTrigger(state) {
            state.signupModalIsShown = !state.signupModalIsShown
        }
    }
})

export const modalActions = modalSlice.actions

export default modalSlice.reducer;