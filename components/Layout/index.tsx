import React from 'react';
import Navbar from './Navbar';
import styles from '@styles/Layout.module.scss';

const LayoutComponent = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className={styles.children_container}>
                {children}
            </div>
        </>
    );
}

export default LayoutComponent;
