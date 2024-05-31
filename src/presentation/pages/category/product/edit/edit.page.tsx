import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ConvertFileUpload, ErrorCatchHttpInMsg, GetLocalStorage, VALUES_APP } from '@utils'
import { UserAuthEntity } from '@entity'
import { loadingUpdateAction, msgUpdateAction } from '@redux/configuration'
import CategoryProductEditView from './editView.page'
import { CategoryProductServiceImpl } from '@usecases'
import { CategoryProductRepositoryImpl } from '@repository'
import { categoryProductSelector, updateCategoryProductAction } from '@redux/category'

const CategoryProductEditPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { categoryId } = useParams()

    const category = useSelector(categoryProductSelector)

    const categoryService = new CategoryProductServiceImpl(new CategoryProductRepositoryImpl())

    React.useEffect(() => {
        loadingUpdateAction(dispatch, { status: true });
        if (categoryId) categoryService.openById(parseInt(categoryId)).then(async valueCategory => {
            updateCategoryProductAction(dispatch, valueCategory)
            loadingUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateCategory = (name: string, statusIcon: -1 | 0 | 1, filesElementIcon: React.MutableRefObject<HTMLInputElement | null>) => {
        const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
        if (tokenLocal !== null && category !== null) {
            const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
            loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
            categoryService.upload(statusIcon === 1 ? ConvertFileUpload(filesElementIcon) : null, userAuth.token).then(async valueIcon => {
                categoryService.updateAllById(category.id, name, statusIcon, valueIcon).then(async _ => {
                    loadingUpdateAction(dispatch, { status: false })
                    msgUpdateAction(dispatch, { msgs: 'message.alert.register_update_success', icon: "success" });
                }).catch(e => {
                    loadingUpdateAction(dispatch, { status: false });
                    msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
                })
            }).catch(e => {
                loadingUpdateAction(dispatch, { status: false });
                msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
            })
        }
    }

    return <CategoryProductEditView
        category={category} clickBack={() => navigate("/category/product")}
        clickUpdate={(name, statusCategoryIcon, filesElementCategoryIcon) => updateCategory(name, statusCategoryIcon, filesElementCategoryIcon)} />
}

export default CategoryProductEditPage