import React from 'react';
import './styles.scss'
import styles from './styles.module.scss';

function AuthLayout(props) {
    const { children } = props;

    return (
        <div className={styles.authLoginWrap}>
            <div>
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
