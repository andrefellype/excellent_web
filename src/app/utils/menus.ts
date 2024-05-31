const MENUS_HEADER_NOT_SIGNIN: MenuHeader = {
    icon: "account_circle",
    redirectTo: "signin",
    isDesktop: false,
    isValidate: { isLogged: false }
}

const MENUS_HEADER_SIGNIN: MenuHeader[] = [
    {
        icon: "vpn_key",
        redirectTo: "user/auth/edit/password",
        isValidate: { isLogged: true }
    },
    {
        icon: "account_circle",
        redirectTo: "user/auth/edit",
        isValidate: { isLogged: true }
    },
    {
        icon: "exit_to_app",
        clickFunction: "signout",
        isValidate: { isLogged: true }
    }
]

export const MENUS_HEADER: MenuHeader[] = [MENUS_HEADER_NOT_SIGNIN, ...MENUS_HEADER_SIGNIN]

const MENUS_SIDEBAR_NOT_SIGNIN: MenuSidebar = {
    group: null,
    menus: [
        {
            icon: "account_circle",
            title: 'menu.access_area',
            redirectTo: "signin",
            isMobile: false,
            isValidate: { isLogged: false }
        }
    ]
}

const MENUS_SIDEBAR_SIGNIN: MenuSidebar = {
    group: null,
    menus: [
        {
            icon: "group",
            title: 'menu.user_list',
            redirectTo: "/user",
            isValidate: { isLogged: true, permissionsLevel: { only: "administrator" } }
        },
        {
            icon: "account_balance",
            title: 'menu.client_list',
            redirectTo: "/client",
            isValidate: { isLogged: true }
        },
        {
            icon: "list_alt",
            title: 'menu.category_list',
            redirectTo: "/category/product",
            isValidate: { isLogged: true }
        },
        {
            icon: "list_alt",
            title: 'menu.product_list',
            redirectTo: "/product",
            isValidate: { isLogged: true }
        },
        {
            icon: "list_alt",
            title: 'menu.order_list',
            redirectTo: "/order",
            isValidate: { isLogged: true }
        }
    ]
}

export const MENUS_SIDEBAR: MenuSidebar[] = [MENUS_SIDEBAR_NOT_SIGNIN, MENUS_SIDEBAR_SIGNIN]

export interface MenuValidate { isLogged?: boolean, permissionsLevel?: MenuPermissions, isExternal?: any }
export interface MenuPermissions { only?: string | string[], except?: string | string[] }

export interface MenuHeader {
    title?: string;
    icon?: string | any;
    clickFunction?: string;
    redirectTo?: string;
    isMobile?: boolean;
    isDesktop?: boolean;
    isValidate?: MenuValidate;
}

export interface MenuSidebar { group: string | null, menus: MenuSidebarItem[], isMobile?: boolean, isDesktop?: boolean, isValidate?: MenuValidate }

export interface MenuSidebarItem {
    icon?: string | any;
    title: string;
    clickFunction?: string;
    redirectTo?: string;
    isMobile?: boolean;
    isDesktop?: boolean;
    isValidate?: MenuValidate;
}