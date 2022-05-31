import React, { FC } from "react";
import styles from "./about.module.css"

interface IAboutProps{
    rutaImg: string,
    textInfo: string
}

const About: FC<IAboutProps> = ({rutaImg, textInfo}) => {

    return(
        <React.Fragment>
            <section className={styles.container}>
                <h1>ABOUT</h1>
                <div>
                    <img className={styles.img} src={`${rutaImg}`} />
                </div>
                <div>{textInfo}</div>
            </section>
            
        </React.Fragment>      
    )
}

export default About;