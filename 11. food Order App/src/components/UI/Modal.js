import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose} ></div>
}

const Overlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("overlays"))}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.getElementById("overlays"))}
        </>
    )
};

export default Modal