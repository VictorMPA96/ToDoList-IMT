import React, { FC } from "react";
import ToastB from "react-bootstrap/esm/Toast";
import ToastContainerB from "react-bootstrap/esm/ToastContainer";

interface IToastProps{
    bg: string;
    showBoolean: boolean;
    fn: () => void;
    text: string;

}

const Toast: FC<IToastProps> = ({bg, showBoolean, fn, text}) => {

    
    return(
        <ToastContainerB className="p-3" position="bottom-center">
            <ToastB bg={bg} onClose={fn} show={showBoolean} delay={2000} autohide>
                <ToastB.Header>
                    <strong className="me-auto">Internal message:</strong>
                </ToastB.Header>
                <ToastB.Body>{text}</ToastB.Body>
            </ToastB>
        </ToastContainerB>
    )
}

export default Toast;