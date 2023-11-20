import React from 'react'
import classNames from 'classnames'
import Icon from '../component/Icon'
import { useTheme, useThemeUpdate } from './provider/Theme';
import Toggle from './Toggle';
import Logo from './Logo';
import Menu from '../component/menu/Menu';
import MobileMenu from '../component/menu/MobileMenu';
import InvestmentMenu from '../component/menu/InvestMenu';
import menu from '../component/menu/MenuData';
const Header = ({ fixed, className, ...props }) => {
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();

    const headerClass = classNames({
        "nk-header is-regular": true,
        "nk-header-fixed": fixed,
        [`is-light`]: theme.header === "white",
        [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
        [`${className}`]: className,
    });

    return (
        <div className={headerClass}>
            <div className={`container-fluid wide-${window.location.pathname.split("/")[2] === "dashboard" ? "lg" : "xl"}`}>
                <div className="nk-header-wrap">
                    <div className="nk-menu-trigger me-sm-2 d-lg-none">
                        <Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="menu" click={themeUpdate.sidebarVisibility} />
                    </div>
                    <div className="nk-header-brand">
                        <Logo />
                    </div>
                    <div className={`nk-header-menu ${theme.sidebarMobile ? "mobile-menu" : ""}  ${theme.sidebarVisibility ? "nk-header-active" : ""}`}>
                        <div className="nk-header-mobile">
                            <div className="nk-header-brand">
                                <Logo />
                            </div>
                            <div className="nk-menu-trigger me-n2">
                                <Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="arrow-left" click={themeUpdate.sidebarVisibility} />
                            </div>
                        </div>
                        {window.location.pathname.split("/")[2] === "invest" && theme.sidebarMobile ? (
                            <MobileMenu data={menu[0].subMenu[menu[0].subMenu.length - 1].subPanel} />
                        ) : window.location.pathname.split("/")[2] === "invest" ? (
                            <InvestmentMenu />
                        ) : theme.sidebarMobile ? (
                            <MobileMenu data={menu} />
                        ) : (
                            <Menu />
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
