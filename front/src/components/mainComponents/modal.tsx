import React, { FC } from "react";
import styles from "./modal.module.css"

interface IModalProps{
    content: any;
    _id: string;
    
}

const Modal: FC<IModalProps> = ({_id, content}) => {

    return(
        <section className={styles.blocker} id={_id}>    
            <div className={styles.container}>
                {content}
            </div>              
        </section>        
    )
}

export default Modal;