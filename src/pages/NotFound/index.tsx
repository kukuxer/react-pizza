import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import React from "react";

 const NotFound: React.FC = () => {
    return (
        <div className={styles['not-found']}>
            <svg className={styles['not-found__icon']} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2" />
            </svg>
            <h1 className={styles['not-found__title']}>Page Not Found</h1>
            <p className={styles['not-found__description']}>
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link to="/" className={styles['not-found__button']}>
                Go Back Home
            </Link>
        </div>
    );
};
 export default NotFound


