import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import ImageUser from '@/assets/images/logos/user_default.png'
import InlineSVG from 'react-inlinesvg';
import barsIcon from '@/assets/images/icons/duotone/bars.svg'
import {useDispatch, useSelector} from 'react-redux';
import {handleSetIsShowSideBar} from '@/states/modules/app';
import useWindowSize from '@/utils/hooks/useWindowSize';
import {Link} from 'react-router-dom';

const Header = () => {
    const breadcrumb = useSelector(state => state.app.breadcrumb);
    const titlePage = useSelector(state => state.app.title);
    const authUser = useSelector((state) => state.auth.authAdmin);

    const dispatch = useDispatch()

    const windowSize = useWindowSize()
    const handleRenderItemBreadCrumb = (index, item) => {
        switch (index) {
            case 0:
                return (
                    <><Link to={'/'}><span
                        className={`${styles.text}`}>Trang chủ</span></Link> {breadcrumb?.length !== 1 && "-"} </>
                );
            case breadcrumb.length - 1:
                return (
                    <Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link>
                );
            default:
                return (
                    <><Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link> - </>
                );
        }
    }

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
                {
                    ((windowSize.width <= 576)) ?
                        <InlineSVG onClick={() => dispatch(handleSetIsShowSideBar(true))} src={barsIcon} width={20}
                                   alt="" className={`cursor-pointer`}/> : ""
                }
                <div>
                    {
                        titlePage ? <div className={styles.headerMainWrap}>
                            <div className={`text-lg text-brandb-base font-bold`}>{titlePage}</div>
                        </div> : ''}

                    {
                        breadcrumb?.length > 0 ?
                            <div className={styles.breadcrumbWrap}>
                                {
                                    breadcrumb.map((item, index) => {
                                        return <span key={index}
                                                     className='text-sm text-gray-45 cursor-pointer transition-all duration-300 hover:text-blue-65'>{(handleRenderItemBreadCrumb(index, item))}</span>
                                    })
                                }
                            </div> : ''
                    }
                </div>
            </div>
            <div className={`${styles.headerRightWrap}`}>
                <div className={`${styles.itemHeaderRight}`}>
                    <div className='mr-2 flex items-end'>
                        {/**/}
                    </div>
                    <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo}
                             trigger="click">
                        <div className={styles.infoWrap}>
                            <div className={styles.avatarWrap}>
                                <img src={authUser.avatar ? authUser.avatar : ImageUser} alt=""/>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </header>
    );
};

export default Header;
