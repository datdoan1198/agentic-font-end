import React from 'react';
import dark from './styles.module.scss';
import {handleCheckRoute} from "@/utils/helper";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { Tooltip } from 'antd';

function NavItem(props) {
  const styles = dark;
  const { route, isShowMenu } = props;
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const isShowSideBar = useSelector(state => state.app.isShowSideBar);

  const handleCheckRouteActive = (routeActive, isShowMenu = false) => {
    let isActive = false;
    if (handleCheckRoute(routeActive, location.pathname, params) || isShowMenu) {
      isActive = true
    }
    return isActive;
  }

  return (
    <>
      {
        route.children && route.children.length > 0 ?
        <>
          <div
            className={`
            ${styles.navItemWrap}
            ${!isShowSideBar ? styles.navItemCloseWrap : ''}
            ${ handleCheckRouteActive(route.routeActive, isShowMenu) ? 
              isShowSideBar ?  styles.activeNavItemAndSubMenuWrap : styles.navItemActiveWrap : '' 
            }
          `}>
            <div className={styles.textWrap}>
              <div className={styles.iconWrap}>
                { route.icon }
              </div>
              {
                isShowSideBar ? <span className={styles.text}>{route.label}</span> : ''
              }
            </div>
            {
              isShowSideBar && route.children && route.children.length > 0 ?
                <div className={styles.btnDrop}>
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L5 4.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 5 7Z" fill="currentColor"/>
                  </svg>
                </div> : ''
            }
          </div>
          {
            isShowSideBar ?
            <ul className={`
              ${styles.menuSubNav}
              ${handleCheckRouteActive(route.routeActive, isShowMenu) ? styles.menuSubForSubItemActive : ''}
            `}>
              {
                route.children.map((subMenu) => {
                  return (
                    <li key={subMenu.path} className={`${styles.menuSubNavItem}`}>
                      <div
                        onClick={() => {navigate(subMenu.path);   document.title = `${subMenu.label} | Hệ thống quản lý mầm non June Connect`}}
                        className={`${styles.contentSubNavItemWrap} ${handleCheckRoute(subMenu.routeActive, location.pathname) ? styles.menuSubFoSubItemActive : ''}`}
                      >
                        <div className={styles.textWrap}>
                          <div className={styles.iconWrap}>
                            <div className={styles.dotted}></div>
                          </div>
                          <span className={styles.text}>{subMenu.label}</span>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul> : ''
          }
        </> :
        <>
            <Tooltip placement='right' title={isShowSideBar ? '' : route.label}>
          <div
            className={`
            ${styles.navItemWrap}
            ${!isShowSideBar ? styles.navItemCloseWrap : ''}
            ${ handleCheckRouteActive(route.routeActive) ? styles.navItemActiveWrap : '' }
          `}>
            <div className={styles.textWrap}>
              <div className={styles.iconWrap}>
                { route.icon }
              </div>
              {
                isShowSideBar ? <span className={styles.text}>{route.label}</span> : ''
              }
            </div>
            {
              isShowSideBar && route.children && route.children.length > 0 ?
                <div className={styles.btnDrop}>
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 7a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L5 4.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 5 7Z"
                      fill="#fff"/>
                  </svg>
                </div> : ''
            }
          </div>
          </Tooltip>
        </>
      }
    </>
  );
}

export default NavItem;
