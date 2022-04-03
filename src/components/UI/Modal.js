import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return (
    <div className={classes['backdrop']} onClick={props.onHideHandler}>
    </div>
    )
}

const ModalOveralay = (props) => {
    return (
    <div className={classes['modal']}>
        {props.children}
    </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onHideHandler={props.onHideHandler} />, portalElement)}
        {ReactDOM.createPortal(<ModalOveralay>{props.children}</ModalOveralay>, portalElement)}
    </Fragment>
    )
}

export default Modal;