import React from "react";
import UserEditAuthView from "./editView.page";
import { useDispatch, useSelector } from "react-redux";
import { UserAuthServiceImpl, UserServiceImpl } from "@usecases";
import { UserAuthRepositoryImpl, UserRepositoryImpl } from "@repository";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { updateAuthAction, updateUserAction, userAuthSelector, userSelector } from "@redux/user";
import { ErrorCatchHttpInMsg } from "@utils";
import { useNavigate } from "react-router-dom";

const UserEditAuthPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userAuth = useSelector(userAuthSelector)
    const user = useSelector(userSelector)

    const userService = new UserServiceImpl(new UserRepositoryImpl())
    const userAuthService = new UserAuthServiceImpl(new UserAuthRepositoryImpl())

    React.useEffect(() => {
        if (userAuth && userAuth.user) {
            loadingUpdateAction(dispatch, { status: true });
            userService.openOneById(userAuth.user.id).then(value => {
                updateUserAction(dispatch, value)
                loadingUpdateAction(dispatch, { status: false });
            }).catch(e => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateUser = (name: string, cellphone: string) => {
        if (userAuth && userAuth.user) {
            loadingUpdateAction(dispatch, { title: 'message.processing.update_date', status: true })
            userAuthService.updateAllById(userAuth.user.id, name, cellphone).then(value => {
                updateAuthAction(dispatch, value)
                if (value !== null) {
                    loadingUpdateAction(dispatch, { status: false });
                    msgUpdateAction(dispatch, { msgs: ['message.alert.register_update_success'], icon: 'success' })
                } else {
                    loadingUpdateAction(dispatch, { status: false })
                    navigate("/signin")
                }
            }).catch(e => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
            })
        }
    }

    return <UserEditAuthView user={user} clickUpdate={(name, cellphone) => updateUser(name, cellphone)} />
}

export default UserEditAuthPage