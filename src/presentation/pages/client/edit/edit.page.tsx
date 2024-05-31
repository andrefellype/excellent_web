import React from "react";
import ClientEditView from "./editView.page";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { ClientServiceImpl } from "@usecases";
import { ClientRepositoryImpl } from "@repository";
import { clientSelector, updateClientAction } from "@redux/client";

const ClientEditPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { clientId } = useParams()

    const clientStore = useSelector(clientSelector)

    const clientService = new ClientServiceImpl(new ClientRepositoryImpl())

    React.useEffect(() => {
        if (clientId) {
            loadingUpdateAction(dispatch, { status: true });
            clientService.openOneById(parseInt(clientId)).then(value => {
                if (value) {
                    updateClientAction(dispatch, value)
                    loadingUpdateAction(dispatch, { status: false });
                }
            }).catch(e => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateClientClient = (name: string, email: string) => {
        if (clientId) {
            loadingUpdateAction(dispatch, { title: 'message.processing.update_date', status: true })
            clientService.updateAllById(parseInt(clientId), name, email).then(_ => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ['message.alert.register_update_success'], icon: 'success' })
            }).catch(e => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
            })
        }
    }

    return <ClientEditView
        client={clientStore} redirectBack={() => navigate("/client")}
        clickRegister={(name, email) => updateClientClient(name, email)} />
}

export default ClientEditPage