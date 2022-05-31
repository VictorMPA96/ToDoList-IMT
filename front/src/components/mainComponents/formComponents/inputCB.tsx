import React, { FC } from "react";

interface IInputProps {
    _id: string;      
    onClick?: () => void; 
    onChange?: () => void;    
    text: string;
}



const Input: FC<IInputProps> = ({_id, text, onClick}) => {    

    return (
        <React.Fragment>
            <div>
                <label htmlFor={_id}>{text}</label>
                <input 
                    type="checkbox" 
                    id={_id} 
                    onClick={onClick}
                />
            </div>            
        </React.Fragment>
        
    )
}

export default Input;