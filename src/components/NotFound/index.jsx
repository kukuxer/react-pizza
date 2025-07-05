import * as React from "react";
import styles from "./NotFound.module.scss"
export const NotFound = () => {
    return (
        <div className={styles.root}>
            <h1>nothing here </h1>
            <p>We are sorry, but the page you requested was not found</p>
        </div>
    );
};