import React from "react";
import UserSignInView from "./signInView.page";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserAuthServiceImpl } from "@usecases";
import { UserAuthRepositoryImpl } from "@repository";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { updateAuthAction, userAuthSelector } from "@redux/user";
import { UserAuthEntity } from "@entity";

const UserSignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userAuthStore = useSelector(userAuthSelector)

    const userService = new UserAuthServiceImpl(new UserAuthRepositoryImpl())

    React.useEffect(() => {
        if (typeof userAuthStore !== "undefined" && userAuthStore !== null) redirectSignIn(userAuthStore)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const signInUser = (cellphone: string, password: string) => {
        loadingUpdateAction(dispatch, { title: 'message.user.access.signin_process', status: true })
        userService.signIn(cellphone, password).then(value => {
            if (value) {
                updateAuthAction(dispatch, value)
                loadingUpdateAction(dispatch, { status: false });
                redirectSignIn(value)
            }
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            if (typeof e.error !== "undefined") {
                const error = e.error === "not_validate" ? 'message.alert.data_invalid' : (e.error === "data_block" ? 'message.user.access.blocked' : e.error)
                msgUpdateAction(dispatch, { msgs: [error], icon: "error" });
            } else msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const redirectSignIn = (userAuth: UserAuthEntity) => {
        if (userAuth.user.isAdmin) navigate("/user"); else navigate("/order")
    }

    return <UserSignInView
        redirectSignUp={() => navigate("/signup")} clickSignin={(cellphone, password) => signInUser(cellphone, password)} />
}

export default UserSignInPage