import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ConvertFileUpload, ErrorCatchHttpInMsg, GetLocalStorage, VALUES_APP } from '@utils'
import { UserAuthEntity } from '@entity'
import { loadingUpdateAction, msgUpdateAction } from '@redux/configuration'
import ProductEditView from './editView.page'
import { ProductServiceImpl } from '@usecases'
import { ProductRepositoryImpl } from '@repository'
import { productSelector, updateProductAction } from '@redux/product'

const ProductEditPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { productId } = useParams()

    const product = useSelector(productSelector)

    const productService = new ProductServiceImpl(new ProductRepositoryImpl())

    React.useEffect(() => {
        loadingUpdateAction(dispatch, { status: true });
        if (productId) productService.openById(parseInt(productId)).then(async valueProduct => {
            updateProductAction(dispatch, valueProduct)
            loadingUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateProduct = (description: string, grossPrice: string, salePrice: string, statusPhoto: -1 | 0 | 1, filesElementPhoto: React.MutableRefObject<HTMLInputElement | null>) => {
        const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
        if (tokenLocal !== null && product !== null) {
            const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
            loadingUpdateAction(dispatch, { title: 'message.processing.saved_data', status: true })
            productService.upload(statusPhoto === 1 ? ConvertFileUpload(filesElementPhoto) : null, userAuth.token).then(async valuePhoto => {
                productService.updateAllById(product.id, description, grossPrice, salePrice, statusPhoto, valuePhoto).then(async _ => {
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

    return <ProductEditView
        product={product} clickBack={() => navigate("/product")}
        clickUpdate={(description, grossPrice, salePrice, statusProductPhoto, filesElementProductPhoto) =>
            updateProduct(description, grossPrice, salePrice, statusProductPhoto, filesElementProductPhoto)} />
}

export default ProductEditPage