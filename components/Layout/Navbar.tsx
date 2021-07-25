import { useState, useEffect } from 'react';
import styles from '@styles/Navbar.module.scss';

const Navbar = () => {

    const useShadow = () => {
        const [isSetShadow, setIsSetShadow] = useState<boolean>(false);

        const settingShadow = () => {
            if (window.scrollY === 0) {
                setIsSetShadow(false);
            } else {
                setIsSetShadow(true);
            }
        }

        useEffect(() => {
            if (typeof window !== 'undefined') {
                window.addEventListener("scroll", settingShadow);
                return () => {
                    window.removeEventListener("scroll", settingShadow);
                };
            }
        }, []);

        return {
            isSetShadow
        }
    }

    const { isSetShadow } = useShadow();

    return (
        <div className={styles.navbar_container}>
            <div className={`${styles.navbar_content} ${isSetShadow && styles.navbar_shadow}`}>
                <div className={styles.navbar_box_container}>
                    <div className={styles.navbar_logo_container}>
                        <img src="laughing.png" alt="Laugh-Icon" className={styles.logo_icon}/>
                        <span className={styles.topic_word}>Joke List</span>
                    </div>
                    <div className={styles.navbar_menu_container}>
                        <div className={styles.menu_content}>Many jokes are waiting for you.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
