import React from 'react';
import styles from './Loading.module.scss';

const DodoLoading = () => {
    return (
        <div className={styles.dodoLoading}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Preparing something tasty...</p>
        </div>
    );
};

export default DodoLoading;
