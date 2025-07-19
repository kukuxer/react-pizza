import React from 'react';
import styles from './ErrorPage.module.scss';

export const ErrorPage: React.FC = () => {
    return (
        <div className={styles['error-page']}>
            <svg
                className={styles['error-page__icon']}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                ></path>
            </svg>

            <h1 className={styles['error-page__title']}>Oops! Something went wrong</h1>
            <p className={styles['error-page__description']}>
                We're sorry, but an unexpected error has occurred. Please try again later.
            </p>
            <button
                className={styles['error-page__button']}
                onClick={() => (window.location.href = '/')}
            >
                Go Back Home
            </button>
        </div>
    );
}
