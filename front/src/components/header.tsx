import React, { FC } from "react";
import styles from "./header.module.css"

interface IHeaderProps {
    text: string;
    icon?: any;
}

const Header: FC<IHeaderProps> = ({text, icon}) => {

    return (
        <header>
            <h2 className={styles.h2}>{text}{icon}</h2>
        </header>
    )
}

export default Header;