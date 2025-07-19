import React from 'react';
import styles from './EmptyBasket.module.scss'

export const EmptyBasket: React.FC = () => {
    return (
        <div className={styles['empty-basket']}>
            <svg
                className={styles['empty-basket__icon']}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293A1 1 0 0 0 6 17h12a1 1 0 0 0 .894-1.447L16 13M7 13V6a1 1 0 0 1 1-1h9m-5 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm7 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                ></path>
            </svg>

            <h1 className={styles['empty-basket__title']}>Your basket is empty</h1>
            <p className={styles['empty-basket__description']}>
                Looks like you haven't added any pizzas yet. Start exploring our delicious menu and add your favorites!
            </p>
            <button
                className={styles['empty-basket__button']}
                onClick={() => (window.location.href = '/')}
            >
                Go to Menu
            </button>
        </div>
    );
}
