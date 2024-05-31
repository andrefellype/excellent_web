import React from "react";
import UserNewView from "./newView.page";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { UserServiceImpl } from "@usecases";
import { UserRepositoryImpl } from "@repository";

const UserNewPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userService = new UserServiceImpl(new UserRepositoryImpl())

    const insertUser = (name: string, cellphone: string, isAdmin: boolean, password: string, passwordConfirm: string, callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
        userService.register(name, cellphone, password, passwordConfirm, isAdmin).then(_ => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_insert_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <UserNewView
        redirectBack={() => navigate("/user")}
        clickRegister={(name, cellphone, isAdmin, password, password_confirm, callbackSuccess) =>
            insertUser(name, cellphone, isAdmin, password, password_confirm, callbackSuccess)} />
}

export default UserNewPage