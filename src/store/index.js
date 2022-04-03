import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal-slice';
import authReducer from './auth-slice'

const store = configureStore({
    reducer: { modal: modalReducer, auth: authReducer }
})

 export default store;

