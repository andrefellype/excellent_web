import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuSidebarItem, MenuSidebar, MenuValidate } from '@utils';
import SidebarView from './sidebarView.component';

export const SidebarTest: React.FC<{
    toggleDrawer: () => void, isOpen: boolean, menus: MenuSidebar[],
    clickMenuFunction?: (typeClick: string) => void,
    checkLogged?: (validate?: MenuValidate) => boolean
}> = (props) => {
    const {
        menus, isOpen, toggleDrawer, clickMenuFunction, checkLogged
    } = props

    const navigate = useNavigate()

    const clickMenu = (menu: MenuSidebarItem, nameKey: string) => {
        if (clickMenuFunction && menu.clickFunction) return () => clickMenuFunction(menu.clickFunction!!)
        if (menu.redirectTo) return () => navigate(menu.redirectTo!!)
        return () => { }
    }

    const checkValidateMenu = (validate?: MenuValidate) => (typeof checkLogged !== "undefined") ? checkLogged(validate) : true

    return <SidebarView
        isOpen={isOpen} toggleDrawer={toggleDrawer}
        menus={menus} clickMenu={(menu, nameKey) => clickMenu(menu, nameKey)}
        checkValidateMenu={(validate) => checkValidateMenu(validate)} />
}