import React, {useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import {MenuFoldOutlined} from "@ant-design/icons";
import Logo from "@/assets/images/logos/logo-june-kids.png";
import IconLogo from "@/assets/images/logos/logo-june.png";
import NavItem from "./components/NavItem";
import {routeMap} from "@/router/routeMap.js";
import {handleCheckRoute, hasPermissions} from "@/utils/helper.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleSetIsShowSideBar} from "@/states/modules/app";
import useWindowSize from "@/utils/hooks/useWindowSize";
import InlineSVG from "react-inlinesvg";
import timeIcon from "@/assets/images/icons/duotone/times.svg";
import {Link} from "react-router-dom";
import _ from "lodash";

SideBar.prototype = {
    isShowSideBar: PropTypes.bool.isRequired,
    handleToggleIsShowSideBar: PropTypes.func,
};

SideBar.defaultProps = {
    isShowSideBar: true,
};

function SideBar(props) {
    const {isShowSideBar, handleToggleIsShowSideBar} = props;
    const [indexNavItemSelect, setIndexNavItemSelect] = useState(null);
    const [menuSub, setMenuSub] = useState([]);
    const [topMenuSub, setTopMenuSub] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.authAdmin);
    const menuRef = useRef();
    const windowSize = useWindowSize();

    const handleToggleMenu = (indexNavItem, menuNavItem) => {
        if (menuRef.current) {
            sessionStorage.setItem("scrollPosition", menuRef.current.scrollTop);
        }

        if (_.isEmpty(menuNavItem.children) && menuNavItem.path) {
            document.title = `${menuNavItem.label} | Hệ thống quản lý mầm non June Connect`
            navigate(menuNavItem.path);
        }
        if (isShowSideBar) {
            setIndexNavItemSelect(indexNavItem !== indexNavItemSelect ? indexNavItem : null);
        }
    };

    const handleHoverMenuNavItem = (e, menuNavItem) => {
        const {top} = e.target.getBoundingClientRect();
        setTopMenuSub(top);
        if (menuNavItem.children) {
            setMenuSub(menuNavItem.children);
        } else {
            setMenuSub([]);
        }
    };

    const handleLeaveMenuNavItem = () => {
        setMenuSub([]);
    };


    useEffect(() => {
        if (menuRef.current) {
            const savedPosition = sessionStorage.getItem("scrollPosition");
            if (savedPosition) {
                menuRef.current.scrollTop = savedPosition;
            }
        }
    }, [location.pathname]);

    return (
        <div
            onMouseLeave={() => handleLeaveMenuNavItem()}
            className={`${styles.sideBarWrap} ${!isShowSideBar ? styles.sideBarWrapClose : ""}`}
        >
            <div className={styles.logoWrap}>
                {windowSize.width <= 576 ? (
                    <InlineSVG
                        onClick={(e) => {
                            dispatch(handleSetIsShowSideBar(false));
                            e.stopPropagation();
                        }}
                        src={timeIcon}
                        className="absolute top-[50%] right-[10px] translate-y-[-50%] w-[30px] h-[20px] cursor-pointer"
                    />
                ) : (
                    ""
                )}
                {isShowSideBar ? (
                    <div className={`${styles.imgWrap}`}>
                        <img
                            src={Logo}
                            alt=""
                            onClick={() => {
                                if (windowSize.width > 576) {
                                    navigate("/");
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className={`${styles.imgWrap} ${styles.imgWrapDesktop}`}>
                        <img
                            src={IconLogo}
                            alt=""
                            onClick={() => {
                                if (windowSize.width > 576) {
                                    navigate("/");
                                }
                            }}
                        />
                    </div>
                )}

                <div
                    className={`${styles.btnToggleSideBar} ${styles.btnToggleSideBarMobi} ${
                        !isShowSideBar ? styles.btnToggleSideBarClose : ""
                    }`}
                    onClick={() => handleToggleIsShowSideBar()}
                >
                    <MenuFoldOutlined/>
                </div>
            </div>

            <div className={`${styles.navbarWrap}`} ref={menuRef}>
                <ul className={`${styles.menuNav}`}>
                    {routeMap.map((route, routeIndex) => {
                        if (
                            !route.permissions ||
                            hasPermissions(authUser.permissions, ...route.permissions) ||
                            route.permissions.length === 0
                        ) {
                            return (
                                <div key={`route-${routeIndex}`}>
                                    <div
                                        className={`uppercase text-[13px] font-bold text-brandb-300 ${!isShowSideBar && 'hidden'}`}>{route.label}</div>
                                    {route.menu ? (
                                        <ul className={styles.menuNav}>
                                            {route.routes.map((item, itemIndex) => {
                                                if (
                                                    !item.permissions ||
                                                    hasPermissions(authUser.permissions, ...item.permissions) ||
                                                    item.permissions.length === 0
                                                ) {
                                                    return (
                                                        <li
                                                            key={item.path}
                                                            onMouseEnter={(e) => handleHoverMenuNavItem(e, item)}
                                                            onClick={() => handleToggleMenu(itemIndex, item)}
                                                            className={`
                              ${styles.menuNavItem}
                              ${handleCheckRoute(item.routeActive, location.pathname) ? styles.menuNavItemActive : ""}
                            `}
                                                        >
                                                            <NavItem route={item}
                                                                     isShowMenu={itemIndex === indexNavItemSelect}/>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    ) : null}
                                </div>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>

            <div className={`${styles.btnToggleIsShowSideBar} ${!isShowSideBar ? styles.btnToggleIsHideSideBar : ""}`}>
                {authUser.teacher_school && isShowSideBar ? (
                    <Link to={"/teacher"}>
                        <span
                            className="ml-2 hover:text-brandb-base flex items-center cursor-pointer">Chế độ giáo viên</span>
                    </Link>
                ) : (
                    <div className="block"></div>
                )}
                {windowSize.width > 576 ? (
                    <svg
                        onClick={() => dispatch(handleSetIsShowSideBar(!isShowSideBar))}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M13.5.5 7.5 8l6 7.5" stroke="currentColor"/>
                        <path d="M8.5.5 2.5 8l6 7.5" stroke="currentColor"/>
                    </svg>
                ) : (
                    ""
                )}
            </div>

            {!isShowSideBar && menuSub && menuSub.length > 0 ? (
                <div
                    className={`${styles.boxMenuSubWrap}`}
                    style={{
                        top: `${topMenuSub}px`,
                    }}
                >
                    <div className={styles.listMenuSub}>
                        <ul className={styles.menuSubClose}>
                            {menuSub.map((menuSubItem) => {
                                return (
                                    <li className={styles.menuSubCloseItem} key={`close${menuSubItem.path}`}>
                                        <div
                                            onClick={() => navigate(menuSubItem.path)}
                                            className={`
                              ${styles.contentSubItemWrap} 
                              ${
                                                handleCheckRoute(menuSubItem.routeActive, location.pathname)
                                                    ? styles.menuSubItemActive
                                                    : ""
                                            }
                            `}
                                        >
                                            <div className={styles.textWrap}>
                                                <span className={styles.text}> {menuSubItem.label}</span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default SideBar;
