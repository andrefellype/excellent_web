import { MenuHeader, MenuSidebar, MenuValidate } from "@utils";

export const CheckValidateAuth = (validate: MenuValidate, isLogged: boolean, levels: string[], checkExternal: boolean = true): boolean => {
    if (typeof validate.isLogged !== "undefined") {
        if (!validate.isLogged && isLogged) return false
        if (validate.isLogged && !isLogged) return false
        if (validate.isLogged && isLogged) {
            if (typeof validate.permissionsLevel !== "undefined") {
                if (typeof validate.permissionsLevel.except !== "undefined" && levels.filter((rl) => {
                    if (typeof validate.permissionsLevel!!.except === "string") return rl !== validate.permissionsLevel!!.except;
                    return (validate.permissionsLevel!!.except!!.filter((exc) => exc === rl).length === 0)
                }).length === 0) return false
                if (typeof validate.permissionsLevel.only !== "undefined" && levels.filter((rl) => {
                    if (typeof validate.permissionsLevel?.only === "string") return rl === validate.permissionsLevel?.only;
                    return (validate.permissionsLevel!!.only!!.filter((eon) => eon === rl).length > 0)
                }).length === 0) return false
            }
        }
    }
    return checkExternal
}

export const GetMenuHeaderAuth = (headers: MenuHeader[], checkLogged?: (validate?: MenuValidate) => boolean): MenuHeader[] => headers.map((menu) => {
    return menu
}).filter((menu) => typeof checkLogged === "undefined" || checkLogged(menu.isValidate))

export const GetMenuSidebarAuth = (sidebars: MenuSidebar[], checkLogged?: (validate?: MenuValidate) => boolean) => sidebars.map((menuG) => {
    const newMenuG = menuG
    newMenuG.menus = menuG.menus.map((menu) => { return menu })
    return newMenuG
}).filter((menuG) => {
    const menus = menuG.menus.filter((menu) => {
        return typeof checkLogged === "undefined" || checkLogged(menu.isValidate)
    })
    return (menus.length === 0) ? false : (typeof checkLogged === "undefined" || checkLogged(menuG.isValidate))
});