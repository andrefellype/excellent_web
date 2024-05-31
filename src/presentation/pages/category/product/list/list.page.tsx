import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryProductListView from "./listView.page";
import { loadingTableSelector, loadingTableUpdateAction, loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { ErrorCatchHttpInMsg } from "@utils";
import { CategoryProductEntity } from "@entity";
import { categoriesProductSelector, updateCategoriesProductAction } from "@redux/category";
import { CategoryProductServiceImpl } from "@usecases";
import { CategoryProductRepositoryImpl } from "@repository";
import { CategoryProductListFilterInOrder, CategoryProductListFilterInSearch } from "./listFilter.page";

const CategoryProductListPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [categories, setCategories] = React.useState<CategoryProductEntity[]>([])
    const [filter, setFilter] = React.useState<{ search: string }>({ search: "" })

    const loadingTable = useSelector(loadingTableSelector)
    const categoriesStore = useSelector(categoriesProductSelector)

    const categoryService = new CategoryProductServiceImpl(new CategoryProductRepositoryImpl())

    React.useEffect(() => {
        loadCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadCategories = () => {
        loadingTableUpdateAction(dispatch, { status: true });
        categoryService.all().then(value => {
            updateCategoriesProductAction(dispatch, value)
            loadingTableUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingTableUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    React.useEffect(() => {
        filterData(filter.search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesStore])

    const filterData = (search: string) => {
        let categoriesValue: CategoryProductEntity[] = CategoryProductListFilterInSearch(search, categoriesStore)
        categoriesValue = CategoryProductListFilterInOrder(categoriesValue)
        setFilter({ ...filter, search: search })
        setCategories(categoriesValue)
    }

    const deleteById = (id: number) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        categoryService.deleteById(id).then(_ => {
            loadCategories()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const deleteByIds = (ids: number[], callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        categoryService.deleteByIds(ids).then(_ => {
            loadCategories()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <CategoryProductListView
        loadingTable={loadingTable} categories={categories}
        refreshList={() => loadCategories()} filterList={(search) => filterData(search)}
        clickNewRegister={() => navigate("/category/product/new")}
        clickEditCategory={(categoryId) => navigate(`/category/product/edit/${categoryId}`)}
        clickDeleteById={(categoryId) => deleteById(categoryId)}
        clickDeleteByIds={(categoryIds, callbackSuccess) => deleteByIds(categoryIds, callbackSuccess)} />
}

export default CategoryProductListPage