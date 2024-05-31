import React from "react";
import UserSignUpView from "./signUpView.page";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserAuthServiceImpl } from "@usecases";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { updateAuthAction } from "@redux/user";
import { ErrorCatchHttpInMsg } from "@utils";
import { UserAuthRepositoryImpl } from "@repository";

const UserSignUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userService = new UserAuthServiceImpl(new UserAuthRepositoryImpl())

    const insertUser = (name: string, cellphone: string, password: string, passwordConfirm: string) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
        userService.signUp(name, cellphone, password, passwordConfirm).then(value => {
            updateAuthAction(dispatch, value)
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_insert_success'], icon: 'success' })
            navigate(`/order`)
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <UserSignUpView
        redirectAuth={() => navigate("/signin")}
        clickRegister={(name, cellphone, password, password_confirm) => insertUser(name, cellphone, password, password_confirm)} />
}

export default UserSignUpPage