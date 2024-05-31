import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderListView from "./listView.page";
import { loadingTableSelector, loadingTableUpdateAction, loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { OrderEntity } from "@entity";
import { ordersSelector, updateOrdersAction } from "@redux/order";
import { OrderServiceImpl } from "@usecases";
import { OrderRepositoryImpl } from "@repository";
import { OrderListFilterInOrder, OrderListFilterInSearch } from "./listFilter.page";

const OrderListPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [orders, setOrders] = React.useState<OrderEntity[]>([])
    const [filter, setFilter] = React.useState<{ search: string }>({ search: "" })

    const loadingTable = useSelector(loadingTableSelector)
    const ordersStore = useSelector(ordersSelector)

    const orderService = new OrderServiceImpl(new OrderRepositoryImpl())

    React.useEffect(() => {
        loadOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadOrders = () => {
        loadingTableUpdateAction(dispatch, { status: true });
        orderService.all().then(value => {
            updateOrdersAction(dispatch, value)
            loadingTableUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingTableUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    React.useEffect(() => {
        filterData(filter.search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordersStore])

    const filterData = (search: string) => {
        let ordersValue: OrderEntity[] = OrderListFilterInSearch(search, ordersStore)
        ordersValue = OrderListFilterInOrder(ordersValue)
        setFilter({ ...filter, search: search })
        setOrders(ordersValue)
    }

    const deleteById = (id: number) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        orderService.deleteById(id).then(_ => {
            loadOrders()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const deleteByIds = (ids: number[], callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        orderService.deleteByIds(ids).then(_ => {
            loadOrders()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <OrderListView
        loadingTable={loadingTable} orders={orders}
        refreshList={() => loadOrders()} filterList={(search) => filterData(search)}
        clickNewRegister={() => navigate("/order/new")}
        clickDeleteById={(productId) => deleteById(productId)}
        clickDeleteByIds={(productIds, callbackSuccess) => deleteByIds(productIds, callbackSuccess)} />
}

export default OrderListPage