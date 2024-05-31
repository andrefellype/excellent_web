import React from 'react'
import ProductNewView from './newView.page'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ConvertFileUpload, ErrorCatchHttpInMsg, GetLocalStorage, VALUES_APP } from '@utils'
import { UserAuthEntity } from '@entity'
import { loadingUpdateAction, msgUpdateAction } from '@redux/configuration'
import { ProductServiceImpl } from '@usecases'
import { ProductRepositoryImpl } from '@repository'

const ProductNewPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productService = new ProductServiceImpl(new ProductRepositoryImpl())

    const insertProduct = (description: string, grossPrice: string, salePrice: string, statusPhoto: 0 | 1, filesElementPhoto: React.MutableRefObject<HTMLInputElement | null>, callbackSuccess: () => void) => {
        const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
        if (tokenLocal !== null) {
            const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
            loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
            productService.upload(statusPhoto === 1 ? ConvertFileUpload(filesElementPhoto) : null, userAuth.token).then(async valuePhoto => {
                productService.register(description, grossPrice, salePrice, valuePhoto).then(async _ => {
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

    return <ProductNewView
        clickToBack={() => navigate("/product")}
        clickSaveRegister={(description, grossPrice, salePrice, statusProductPhoto, filesElementProductPhoto, callbackSuccess) =>
            insertProduct(description, grossPrice, salePrice, statusProductPhoto, filesElementProductPhoto, callbackSuccess)} />
}

export default ProductNewPage