import React from 'react';
import {
    ListSubheader, ListItemButton, ListItemIcon, ListItemText, Typography, Toolbar, styled, IconButton,
    Divider, List, Icon, Hidden
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from "react-i18next";
import { MenuSidebarItem, MenuSidebar, MenuValidate } from '@utils';

const SidebarView: React.FC<{
    menus: MenuSidebar[], isOpen: boolean, toggleDrawer: () => void,
    clickMenu: (menu: MenuSidebarItem, nameKey: string) => (() => void),
    checkValidateMenu: (validate?: MenuValidate) => boolean
}> = (props) => {
    const {
        menus, isOpen, toggleDrawer, checkValidateMenu, clickMenu
    } = props

    const { t } = useTranslation()

    const drawerWidth = 240

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box', ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: { width: theme.spacing(9), }
                })
            }
        })
    )

    const getIcon = (icon?: string | any) => {
        switch (typeof icon) {
            case "string": return <Icon>{icon}</Icon>
            case "object": return icon
            default: return ""
        }
    }

    return <Drawer variant="permanent" open={isOpen}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }}>
            <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1, marginLeft: 2, fontWeight: 'bold' }} />
            <IconButton
                onClick={toggleDrawer}>
                <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
            {menus.filter(menu => checkValidateMenu(menu.isValidate)).map((menuSItem, menuSKey) => <React.Fragment key={menuSKey}>
                <Hidden mdDown={typeof menuSItem.isMobile !== "undefined" && !menuSItem.isMobile} mdUp={typeof menuSItem.isDesktop !== "undefined" && !menuSItem.isDesktop}>
                    {(menuSItem.group && menuSKey > 0) && <Divider sx={{ my: 1 }} />}
                    {menuSItem.group && <ListSubheader sx={{ fontWeight: 'bold', fontSize: '14px' }} component="div" inset>
                        {t(menuSItem.group)}
                    </ListSubheader>}
                    {menuSItem.menus.filter(menu => checkValidateMenu(menu.isValidate)).map((menuItem, menuKey) => <React.Fragment key={menuKey}>
                        <Hidden mdDown={typeof menuItem.isMobile !== "undefined" && !menuItem.isMobile} mdUp={typeof menuItem.isDesktop !== "undefined" && !menuItem.isDesktop}>
                            <ListItemButton
                                onClick={clickMenu(menuItem, `${menuSKey}_${menuKey}`)}>
                                <ListItemIcon>
                                    {getIcon(menuItem.icon)}
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px' } }} primary={t(menuItem.title)} />
                            </ListItemButton>
                        </Hidden>
                    </React.Fragment>)}
                </Hidden>
            </React.Fragment>)}
        </List>
    </Drawer>
}

export default SidebarView