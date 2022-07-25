import React, {FC, useState} from 'react';
import Logo from '../static/logo.svg';
import LogoMobile from '../static/logoMobile.svg';
import LogoutIcon from '../static/logoutIcon.svg';
import LogoutModal from './LogoutModal';
import {useAppSelector} from "../hooks/redux";

const NavBar: FC = () => {

    const [visibleLogoutModal, setVisibleLogoutModal] = useState<boolean>(false);
    const {userInfo, isAuth} = useAppSelector(state => state.UserReducer)

    return (
        <div className="header">
            <div className="header__container container">
                <div className="header__logo">
                    <img
                        src={!isAuth ? Logo : window.innerWidth < 450 ? LogoMobile : Logo}
                        alt="purrweb"
                        className="header__logo-img"
                    />
                </div>
                {isAuth && <div className="header__profile">
                    <div className="header__profile-name">{userInfo.name} {userInfo.surname}</div>
                    <div className="header__logout" onClick={() => setVisibleLogoutModal(true)}>
                        <div className="header__logout-text">Выйти</div>
                        <img src={LogoutIcon} alt="logout" className="header__logout-icon"/>
                    </div>
                    <LogoutModal visibleLogoutModal={visibleLogoutModal} setVisibleLogoutModal={setVisibleLogoutModal}/>
                </div>}
            </div>
        </div>
    );
};

export default NavBar;
