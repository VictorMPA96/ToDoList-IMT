import React, { FC } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonB from 'react-bootstrap/Button';

interface IButtonProps {
    type?: string;
    _id: string;
    text: string;
    onClick: (_id: string) => void;
    className?: any;
}

const Button: FC<IButtonProps> = ({type, _id, text, onClick, className}) => {

    return (        
        <ButtonB className={className} variant={type} id={_id} onClick={() => _id !== undefined && onClick(_id)}>{text}</ButtonB>
    )
}

export default Button;