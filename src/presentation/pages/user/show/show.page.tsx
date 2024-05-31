import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserShowView from "./showView.page";
import { useDispatch, useSelector } from "react-redux";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { UserRepositoryImpl } from "@repository";
import { UserServiceImpl } from "@usecases";
import { ErrorCatchHttpInMsg } from "@utils";
import { updateUserAction, userSelector } from "@redux/user";

const UserShowPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userId } = useParams()

    const user = useSelector(userSelector)

    const userService = new UserServiceImpl(new UserRepositoryImpl())

    React.useEffect(() => {
        if (userId) {
            loadingUpdateAction(dispatch, { status: true });
            userService.openOneById(parseInt(userId)).then(value => {
                if (value) {
                    updateUserAction(dispatch, value)
                    loadingUpdateAction(dispatch, { status: false });
                }
            }).catch(e => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <UserShowView
        user={user} redirectBack={() => navigate("/user")} />
}

export default UserShowPage