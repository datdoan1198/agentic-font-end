import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import SideBar from "@/layouts/User/MainLayout/SideBar/index.jsx";
import Header from "@/layouts/User/MainLayout/Header/index.jsx";

function MainLayout(props) {
    const {children} = props;
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    const scrollRef = useRef(null);
    const [isMenuFixed, setIsMenuFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setIsMenuFixed(scrollRef.current.scrollTop > 64)
            }
        };

        const div = scrollRef.current;
        div.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleToggleShowMenu = () => {
        setIsShowSideBar(!isShowSideBar)
    }

    return (
        <div className={`${styles.boxMainLayout}`}>
            <SideBar isShowSideBar={isShowSideBar}/>

            <div ref={scrollRef}  className={`${styles.boxMain} ${!isShowSideBar && styles.closeSideBar}`}>
                <Header
                    isShowSideBar={isShowSideBar}
                    handleToggleShowMenu={() => handleToggleShowMenu()}
                />
                <div className={styles.mainWrap}>{children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
