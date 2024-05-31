import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuHeader, MenuValidate } from '@utils';
import { HeaderView } from './headerView';

export const HeaderTest: React.FC<{
    isOpen: boolean, toggleDrawer: () => void,
    menus: MenuHeader[], clickMenuFunction?: (typeClick: string) => void, checkLogged?: (validate?: MenuValidate) => boolean
}> = (props) => {
    const { isOpen, toggleDrawer, menus, clickMenuFunction, checkLogged } = props

    const navigate = useNavigate()

    const clickMenu = (menu: MenuHeader) => {
        if (clickMenuFunction && menu.clickFunction) return () => clickMenuFunction(menu.clickFunction!!)
        if (menu.redirectTo) return () => navigate(menu.redirectTo!!)
        return () => { }
    }

    const checkValidateMenu = (validate?: MenuValidate) => (typeof checkLogged !== "undefined") ? checkLogged(validate) : true

    return <HeaderView
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        menus={menus}
        checkValidateMenu={(validate) => checkValidateMenu(validate)}
        clickMenu={(menu) => clickMenu(menu)} />
}