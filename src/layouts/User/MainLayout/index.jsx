import React from 'react';
import styles from './styles.module.scss';

function MainLayout(props) {
    const {children} = props;

    return (
        <div className={`${styles.boxMainLayout}`}>
            <div>
                {children}
            </div>
        </div>
    );
}

export default MainLayout;
