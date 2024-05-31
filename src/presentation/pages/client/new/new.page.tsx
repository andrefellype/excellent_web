import React from "react";
import ClientNewView from "./newView.page";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { ClientServiceImpl } from "@usecases";
import { ClientRepositoryImpl } from "@repository";

const ClientNewPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clientService = new ClientServiceImpl(new ClientRepositoryImpl())

    const insertClient = (name: string, documentNumber: string, email: string, callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
        clientService.register(name, documentNumber, email).then(_ => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_insert_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const searchCnpj = (cnpj: string): Promise<{ name: string, email: string }> => {
        return new Promise(async (resolve, reject) => {
            loadingUpdateAction(dispatch, { status: true })
            await clientService.openInformationByCnpj(cnpj).then(valueI => {
                loadingUpdateAction(dispatch, { status: false })
                resolve({ name: valueI.name, email: valueI.email })
            })
        })
    }

    return <ClientNewView
        redirectBack={() => navigate("/client")} informationCnpj={(cnpj, callbackSuccess) => {
            searchCnpj(cnpj).then(valueC => callbackSuccess(valueC.name, valueC.email))
        }}
        clickRegister={(name, documentNumber, email, callbackSuccess) => insertClient(name, documentNumber, email, callbackSuccess)} />
}

export default ClientNewPage