import React from 'react';
import { Box, CssBaseline, Toolbar, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteLocalStorage, MENUS_HEADER, MENUS_SIDEBAR, MenuValidate, VALUES_APP } from '@utils';
import { loadingSelector, loadingUpdateAction, msgSelector } from '@redux/configuration';
import { updateAuthAction, userAuthSelector } from '@redux/user';
import { useTranslation } from 'react-i18next';
import { UserAuthServiceImpl } from '@usecases';
import { UserAuthRepositoryImpl } from '@repository';
import { HeaderTest } from '@components/header';
import { SidebarTest } from '@components/sidebar/sidebar';
import { FooterTest } from '@components/footer.component';
import { LoadingBackdropTest } from '@components/loading_backdrop.component';
import Swal from 'sweetalert2';
import DialogYesOrNot from '@components/dialog/dialog_yes_or_not.component';
import DialogStatic from '@components/dialog/dialog_static.component';
import { CheckValidateAuth, GetMenuHeaderAuth, GetMenuSidebarAuth } from '@components/menu.validation';

export const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const loadingValue = useSelector(loadingSelector)
    const msgValue = useSelector(msgSelector)
    const authStore = useSelector(userAuthSelector)

    const userAuthService = new UserAuthServiceImpl(new UserAuthRepositoryImpl())

    const [isLogout, setIsLogout] = React.useState(false)
    const [msgFail, setMsgFail] = React.useState("")

    const loadingInitial = async () => {
        loadingUpdateAction(dispatch, { status: true })

        if (typeof authStore !== "undefined" && authStore !== null)
            await userAuthService.refreshToken().then(value => {
                updateAuthAction(dispatch, value);
                if (value === null) navigate("/")
            }).catch(e => {
                if (typeof e.error !== "undefined" && e.error === "token_invalid") navigate("/")
                console.log(e)
            })

        loadingUpdateAction(dispatch, { status: false })
    }

    React.useEffect(() => {
        loadingInitial()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkLogged = (validate?: MenuValidate): boolean =>
        validate ? CheckValidateAuth(validate, authStore !== null, ((authStore && authStore.user.isAdmin) ? ["administrator"] : [])) : typeof validate === "undefined"

    const clickMenuFunctionExternal = (typeClick: string) => { if (typeClick === "signout") setIsLogout(true) }

    const dialogs = () => <DialogYesOrNot open={isLogout} onClose={() => setIsLogout(false)} clickNot={() => setIsLogout(false)}
        clickYes={async () => {
            setIsLogout(false)
            loadingUpdateAction(dispatch, { title: 'message.user.access.signout_process', status: true })
            await userAuthService.signOut().then(_ => {
                DeleteLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
                updateAuthAction(dispatch, null)
                loadingUpdateAction(dispatch, { status: false })
                navigate("/")
            }).catch(e => {
                DeleteLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
                updateAuthAction(dispatch, null)
                loadingUpdateAction(dispatch, { status: false })
                navigate("/")
                console.log(e)
            })
        }} text={t('message.user.access.question_logout_system')} />

    const [openMenu, setOpenMenu] = React.useState(window.screen.width > 768);

    React.useEffect(() => {
        if (msgValue && msgValue !== null) {
            if (msgValue.msgs.length > 0) {
                if (msgValue.type === "message") {
                    let htmlMsg = "<div style='padding-top: 10'>"
                    const uppercase = typeof msgValue.uppercase === "undefined" || msgValue.uppercase
                    msgValue.msgs.forEach(msg =>
                        htmlMsg += `<div style='font-size: 20px; font-weight: bold; margin-bottom: 10'>${uppercase ? t(msg).toUpperCase() : t(msg)}</div>`)
                    htmlMsg += "</div>"
                    Swal.fire({
                        icon: msgValue.icon !== null ? msgValue.icon : "info",
                        title: (msgValue.title && msgValue.title !== null) ? t(msgValue.title) : "",
                        allowOutsideClick: false, position: 'center', html: htmlMsg,
                    })
                } else if (msgValue.type === "fail_page") setMsgFail(t(msgValue.msgs[0]).toUpperCase())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msgValue])

    return <React.Fragment>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HeaderTest
                isOpen={openMenu} toggleDrawer={() => setOpenMenu(!openMenu)}
                menus={GetMenuHeaderAuth(MENUS_HEADER, checkLogged)}
                clickMenuFunction={typeClick => clickMenuFunctionExternal(typeClick)}
                checkLogged={(validate?: MenuValidate) => checkLogged(validate)} />
            <SidebarTest
                isOpen={openMenu}
                toggleDrawer={() => setOpenMenu(!openMenu)}
                menus={GetMenuSidebarAuth(MENUS_SIDEBAR, checkLogged)}
                clickMenuFunction={typeClick => clickMenuFunctionExternal(typeClick)}
                checkLogged={(validate?: MenuValidate) => checkLogged(validate)} />
            <Box component="main" sx={{
                backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1,
                height: '100vh', overflow: 'auto',
            }}>
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 1, mb: 2 }}>
                    {(typeof loadingValue !== "undefined" && loadingValue.status) && <LoadingBackdropTest loading={{ title: loadingValue.title }} />}
                    <Outlet />
                    <FooterTest sx={{ pt: 2 }} />
                </Container>
            </Box>
        </Box>
        <DialogStatic open={msgFail.length > 0} message={msgFail} />
        {dialogs()}
    </React.Fragment>
}