import React from 'react'
import ProductNewView from './newView.page'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ErrorCatchHttpInMsg } from '@utils'
import { loadingUpdateAction, msgUpdateAction } from '@redux/configuration'
import { ClientServiceImpl, OrderServiceImpl, ProductServiceImpl } from '@usecases'
import { ClientRepositoryImpl, OrderRepositoryImpl, ProductRepositoryImpl } from '@repository'
import { clientsSelector, updateClientsAction } from '@redux/client'
import { productsSelector, updateProductsAction } from '@redux/product'

const OrderNewPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clientsStore = useSelector(clientsSelector)
    const productsStore = useSelector(productsSelector)

    const orderService = new OrderServiceImpl(new OrderRepositoryImpl())
    const clientService = new ClientServiceImpl(new ClientRepositoryImpl())
    const productService = new ProductServiceImpl(new ProductRepositoryImpl())

    const loadInitial = async () => {
        loadingUpdateAction(dispatch, { status: true });

        await clientService.all().then(value => {
            updateClientsAction(dispatch, value)
        }).catch(e => {
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })

        await productService.all().then(value => {
            updateProductsAction(dispatch, value)
        }).catch(e => {
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })

        loadingUpdateAction(dispatch, { status: false });
    }

    React.useEffect(() => { loadInitial() }, [])

    const insertClient = (quantity: number, productIds: number[], clientId: number | null, callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
        orderService.register(quantity, productIds, clientId).then(async _ => {
            loadingUpdateAction(dispatch, { status: false })
            msgUpdateAction(dispatch, { msgs: 'message.alert.register_insert_success', icon: "success" });
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <ProductNewView
        products={productsStore ? productsStore : []} clients={clientsStore ? clientsStore : []} clickToBack={() => navigate("/order")}
        clickSaveRegister={(quantity, productIds, clientId, callbackSuccess) => insertClient(quantity, productIds, clientId, callbackSuccess)} />
}

export default OrderNewPage