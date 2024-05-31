import React from 'react';
import { Toolbar, styled, IconButton, Typography, Hidden, Avatar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@mui/material/Icon';
import { useTranslation } from "react-i18next";
import { MenuHeader, MenuValidate, VALUES_APP } from '@utils';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface AppBarProps extends MuiAppBarProps { open?: boolean }

export const HeaderView: React.FC<{
    isOpen: boolean, toggleDrawer: () => void, menus: MenuHeader[], clickMenu: (menu: MenuHeader) => (() => void),
    checkValidateMenu: (validate?: MenuValidate) => boolean
}> = (props) => {
    const { isOpen, toggleDrawer, menus, clickMenu, checkValidateMenu } = props

    const { t } = useTranslation()

    const drawerWidth = 240

    const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }), ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        })
    }))

    const getIconMenu = (menu: MenuHeader) => {
        switch (typeof menu.icon) {
            case "string": return <Icon>{menu.icon}</Icon>
            case "object": return menu.icon
            default: return ""
        }
    }

    return <AppBar position="absolute" open={isOpen}>
        <Toolbar sx={{ pr: '24px' }}>
            <IconButton
                onClick={toggleDrawer}
                edge="start" color="inherit" aria-label="open drawer" sx={{ marginRight: '36px', ...(isOpen && { display: 'none' }), }}><MenuIcon /></IconButton>
            <Avatar alt="APP_HEADER_MAIN" src={`${process.env.PUBLIC_URL}/images/logo_toolbar.png`} />
            <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1, marginLeft: 2, fontWeight: 'bold' }}>
                {VALUES_APP().APP.NAME}
            </Typography>
            {menus.filter(menu => checkValidateMenu(menu.isValidate)).map((menu, menuKey) => {
                return <React.Fragment key={menuKey}>
                    <Hidden mdDown={typeof menu.isMobile !== "undefined" && !menu.isMobile} mdUp={typeof menu.isDesktop !== "undefined" && !menu.isDesktop}>
                        <IconButton
                            onClick={clickMenu(menu)}
                            color="inherit">
                            {getIconMenu(menu)} {menu.title ? t(menu.title) : ""}
                        </IconButton>
                    </Hidden>
                </React.Fragment>
            })}
        </Toolbar>
    </AppBar>
}