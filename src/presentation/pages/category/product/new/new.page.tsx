import React from 'react'
import CategoryProductNewView from './newView.page'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ConvertFileUpload, ErrorCatchHttpInMsg, GetLocalStorage, VALUES_APP } from '@utils'
import { UserAuthEntity } from '@entity'
import { loadingUpdateAction, msgUpdateAction } from '@redux/configuration'
import { CategoryProductServiceImpl } from '@usecases'
import { CategoryProductRepositoryImpl } from '@repository'

const CategoryProductNewPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoryService = new CategoryProductServiceImpl(new CategoryProductRepositoryImpl())

    const insertCategory = (name: string, statusIcon: 0 | 1, filesElementIcon: React.MutableRefObject<HTMLInputElement | null>, callbackSuccess: () => void) => {
        const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
        if (tokenLocal !== null) {
            const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
            loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
            categoryService.upload(statusIcon === 1 ? ConvertFileUpload(filesElementIcon) : null, userAuth.token).then(async valueIcon => {
                categoryService.register(name, valueIcon).then(async _ => {
                    loadingUpdateAction(dispatch, { status: false })
                    msgUpdateAction(dispatch, { msgs: 'message.alert.register_insert_success', icon: "success" });
                    callbackSuccess()
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

    return <CategoryProductNewView
        clickToBack={() => navigate("/category/product")}
        clickSaveRegister={(name, statusCategoryIcon, filesElementCategoryIcon, callbackSuccess) =>
            insertCategory(name, statusCategoryIcon, filesElementCategoryIcon, callbackSuccess)} />
}

export default CategoryProductNewPage