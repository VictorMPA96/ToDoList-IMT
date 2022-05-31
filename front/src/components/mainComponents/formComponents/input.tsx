import React, { FC } from "react";
import styles from "./input.module.css";

interface IInputProps {
    _id: string;
    placeholder: string;    
    onChange: (text: string) => void;
    value?: string;
    text: string;
}



const Input: FC<IInputProps> = ({_id, text, placeholder, onChange, value}) => {    

    return (
        <React.Fragment>
            <label htmlFor={_id}>{text}</label>
            <br />
            <input 
                className={styles.inputText}
                type="text" 
                id={_id} 
                placeholder={placeholder} 
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </React.Fragment>
        
    )
}

export default Input;