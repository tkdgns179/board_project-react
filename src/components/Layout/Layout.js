import React, { Fragment } from "react";
import MainHeader from "./MainHeader";
import LoginForm from '../Form/LoginForm'
import SignupForm from '../Form/SignupForm'
import { useSelector } from "react-redux";

const Layout = (props) => {
    const modalState = useSelector(state => state.modal)
    
    return <Fragment>
        {modalState.loginModalIsShown && <LoginForm />}
        {modalState.signupModalIsShown && <SignupForm />}
        <MainHeader />
        {props.children}
    </Fragment>
}

export default Layout;