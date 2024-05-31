import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClientListView from "./listView.page";
import { loadingTableSelector, loadingTableUpdateAction, loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ClientEntity } from "@entity";
import { ClientServiceImpl } from "@usecases";
import { ClientRepositoryImpl } from "@repository";
import { ErrorCatchHttpInMsg } from "@utils";
import { ClientListFilterInOrder, ClientListFilterInSearch } from "./listFilter.page";
import { clientsSelector, updateClientsAction } from "@redux/client";

const ClientListPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loadingTable = useSelector(loadingTableSelector)
    const clientsStore = useSelector(clientsSelector)

    const [clients, setClients] = React.useState<ClientEntity[]>([])
    const [filter, setFilter] = React.useState<{ search: string, order: string }>({ search: "", order: "name" })

    const clientService = new ClientServiceImpl(new ClientRepositoryImpl())

    React.useEffect(() => {
        loadClients()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadClients = () => {
        loadingTableUpdateAction(dispatch, { status: true });
        clientService.all().then(value => {
            updateClientsAction(dispatch, value)
            loadingTableUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingTableUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    React.useEffect(() => {
        filterData(filter.search, filter.order)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientsStore])

    const filterData = (search: string, order: string) => {
        let clientsValue: ClientEntity[] = ClientListFilterInSearch(search, clientsStore)
        clientsValue = ClientListFilterInOrder(order, clientsValue)
        setFilter({ ...filter, search: search, order: order })
        setClients(clientsValue)
    }

    const deleteById = (id: number) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        clientService.deleteById(id).then(_ => {
            loadClients()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const deleteByIds = (ids: number[], callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        clientService.deleteByIds(ids).then(_ => {
            loadClients()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <ClientListView
        orderMain={filter.order} clients={clients}
        loadingTable={loadingTable} refreshList={() => loadClients()}
        filterList={(search, order) => filterData(search, order)}
        clickNewRegister={() => navigate("/client/new")}
        clickEditClient={(clientId) => navigate(`/client/edit/${clientId}`)}
        clickDeleteById={(userId) => deleteById(userId)}
        clickDeleteByIds={(userIds, callbackSuccess) => deleteByIds(userIds, callbackSuccess)} />
}

export default ClientListPage