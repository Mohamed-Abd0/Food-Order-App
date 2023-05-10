
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";


const Backdrob = props =>{

    return <div className={classes.backdrop} onClick={props.onHide}></div>
};

const Overlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content} >{props.children}</div>
        </div>
    )
};

const overlaysElement = document.getElementById('overlays');

const Modal = props =>{

    // console.log('modal is running')
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrob onHide={props.onHide}></Backdrob> , overlaysElement)}
            {ReactDOM.createPortal(<Overlay> {props.children} </Overlay> , overlaysElement)}        
        </Fragment>
    )
};

export default Modal;