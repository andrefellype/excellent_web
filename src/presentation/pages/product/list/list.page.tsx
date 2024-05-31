import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductListView from "./listView.page";
import { loadingTableSelector, loadingTableUpdateAction, loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { ProductEntity } from "@entity";
import { ProductServiceImpl } from "@usecases";
import { ProductRepositoryImpl } from "@repository";
import { productsSelector, updateProductsAction } from "@redux/product";
import { ProductListFilterInOrder, ProductListFilterInSearch } from "./listFilter.page";

const ProductListPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [products, setProducts] = React.useState<ProductEntity[]>([])
    const [filter, setFilter] = React.useState<{ search: string }>({ search: "" })

    const loadingTable = useSelector(loadingTableSelector)
    const productsStore = useSelector(productsSelector)

    const productService = new ProductServiceImpl(new ProductRepositoryImpl())

    React.useEffect(() => {
        loadProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadProducts = () => {
        loadingTableUpdateAction(dispatch, { status: true });
        productService.all().then(value => {
            updateProductsAction(dispatch, value)
            loadingTableUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingTableUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    React.useEffect(() => {
        filterData(filter.search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsStore])

    const filterData = (search: string) => {
        let productsValue: ProductEntity[] = ProductListFilterInSearch(search, productsStore)
        productsValue = ProductListFilterInOrder(productsValue)
        setFilter({ ...filter, search: search })
        setProducts(productsValue)
    }

    const deleteById = (id: number) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        productService.deleteById(id).then(_ => {
            loadProducts()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const deleteByIds = (ids: number[], callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        productService.deleteByIds(ids).then(_ => {
            loadProducts()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <ProductListView
        loadingTable={loadingTable} products={products}
        refreshList={() => loadProducts()} filterList={(search) => filterData(search)}
        clickNewRegister={() => navigate("/product/new")}
        clickEditProduct={(productId) => navigate(`/product/edit/${productId}`)}
        clickDeleteById={(productId) => deleteById(productId)}
        clickDeleteByIds={(productIds, callbackSuccess) => deleteByIds(productIds, callbackSuccess)} />
}

export default ProductListPage