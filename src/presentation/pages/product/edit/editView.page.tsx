import React from 'react'
import { Card, CardActions, Grid, FormControl, TextField } from "@mui/material"
import { useTranslation } from "react-i18next";
import { FormatNumberToCurrencyBrlCustom, notImage, VALUES_APP } from '@utils';
import ButtonCustom from '@components/button_custom.component';
import PageHeader from '@components/page_header.component';
import DialogYesOrNot from '@components/dialog/dialog_yes_or_not.component';
import { ProductEntity } from '@entity';

const ProductEditView: React.FC<{
    product: ProductEntity | null, clickBack: () => void,
    clickUpdate: (description: string, grossPrice: string, salePrice: string, statusProductPhoto: -1 | 0 | 1, filesElementProductPhoto: React.MutableRefObject<HTMLInputElement | null>) => void
}> = (props) => {
    const { product, clickBack, clickUpdate } = props

    const { t } = useTranslation()

    const [description, setDescription] = React.useState("")
    const [grossPrice, setGrossPrice] = React.useState({ value: "", valueBR: "" })
    const [salePrice, setSalePrice] = React.useState({ value: "", valueBR: "" })
    const [productPhotoImage, setProductPhotoImage] = React.useState(notImage)
    const [statusProductPhoto, setStatusProductPhoto] = React.useState<-1 | 0 | 1>(0)
    const [removeProductPhoto, setRemoveProductPhoto] = React.useState(false)

    const changePrice = (value: string) => {
        let valueNew = ""
        const valueNewTemp = value.substring(0, 3) === `${VALUES_APP().APP.SYMBOL_CURRENCY} ` ? value.replace(`${VALUES_APP().APP.SYMBOL_CURRENCY} `, "") : value
        for (let v = 0; v < valueNewTemp.length; v++) {
            if (!Number.isNaN(parseInt(valueNewTemp[v], 10))) valueNew += valueNewTemp[v]
            else if (valueNewTemp.length <= 3 && (valueNewTemp[v] === "." || valueNewTemp[v] === ",")) valueNew += ","
            else if (valueNewTemp.length > 3 && valueNewTemp[v] === ",") valueNew += ","
        }
        let countCaracter = 0
        let countPoint = 0
        for (let v = 0; v < valueNew.length; v++) {
            if (valueNew[v] === "." || valueNew[v] === ",") countPoint++
            else if (Number.isNaN(parseInt(valueNew[v], 10))) countCaracter++
        }
        if (countCaracter === 0 && countPoint <= 1) {
            let valueFormat = valueNew.replace(",", ".")
            if (valueFormat.length > 0) valueFormat = valueFormat[0] !== "." ? valueFormat : `0${valueFormat}`
            return valueFormat
        }
        return null
    }

    const filesElementProductPhoto = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
        if (product) {
            setDescription(product.description)

            let grossPriceValue = { value: "", valueBR: "" }
            let priceG = product.grossPrice != null && product.grossPrice.length > 0 ? product.grossPrice : null
            let priceBrlG = ""
            if (priceG !== null) {
                priceG = changePrice(priceG.replace(".", ","))
                if (priceG && priceG.length > 0 && priceG.toString() === "0")
                    priceBrlG = `${VALUES_APP().APP.SYMBOL_CURRENCY} 0,00`
                else {
                    if (priceG !== null) {
                        const priceBrlStr = FormatNumberToCurrencyBrlCustom(priceG)
                        if (priceBrlStr.indexOf(",") > -1) {
                            const priceBrlStrSplit = priceBrlStr.split(",")
                            if (priceBrlStrSplit.length > 1)
                                priceBrlG = priceBrlStrSplit[1].length > 1 ? `${priceBrlStrSplit[0]},${priceBrlStrSplit[1].substring(0, 2)}` : `${priceBrlStrSplit[0]},${priceBrlStrSplit[1]}0`
                            else priceBrlG = priceBrlStr
                        } else priceBrlG = `${priceBrlStr},00`
                    }
                }
                grossPriceValue = { value: product.grossPrice!!.toString(), valueBR: priceBrlG }
            }
            setGrossPrice(grossPriceValue)

            let salePriceValue = { value: "", valueBR: "" }
            let priceS = product.salePrice != null && product.salePrice.length > 0 ? product.salePrice : null
            let priceBrlS = ""
            if (priceS !== null) {
                priceS = changePrice(priceS.replace(".", ","))
                if (priceS && priceS.length > 0 && priceS.toString() === "0")
                    priceBrlS = `${VALUES_APP().APP.SYMBOL_CURRENCY} 0,00`
                else {
                    if (priceS !== null) {
                        const priceBrlStr = FormatNumberToCurrencyBrlCustom(priceS)
                        if (priceBrlStr.indexOf(",") > -1) {
                            const priceBrlStrSplit = priceBrlStr.split(",")
                            if (priceBrlStrSplit.length > 1)
                                priceBrlS = priceBrlStrSplit[1].length > 1 ? `${priceBrlStrSplit[0]},${priceBrlStrSplit[1].substring(0, 2)}` : `${priceBrlStrSplit[0]},${priceBrlStrSplit[1]}0`
                            else priceBrlS = priceBrlStr
                        } else priceBrlS = `${priceBrlStr},00`
                    }
                }
                salePriceValue = { value: product.salePrice!!.toString(), valueBR: priceBrlS }
            }
            setSalePrice(salePriceValue)

            setProductPhotoImage(product.photoPortrait !== null ? `${VALUES_APP().API.URL_FILES}/${product.photoPortrait}` : notImage)
            setStatusProductPhoto(product.photo !== null ? -1 : 0)
        }
    }, [product])

    return <React.Fragment>
        <PageHeader title={t('title.product.edit')}>
            <Grid container spacing={2} direction="row">
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <Card elevation={5}>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={`${t('field.product.description')}*`} value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={t('field.product.gross_price')} value={grossPrice.valueBR} onChange={(e) => {
                                            const price = changePrice(e.target.value)
                                            if (price !== null) {
                                                let valuePrice = { value: "", valueBR: "" }
                                                if (price.toString() === "0") valuePrice = { value: '0', valueBR: `${VALUES_APP().APP.SYMBOL_CURRENCY} 0` }
                                                else {
                                                    const valueCurrency = FormatNumberToCurrencyBrlCustom(price)
                                                    if (price.indexOf(".") > -1) valuePrice = { value: price, valueBR: FormatNumberToCurrencyBrlCustom(price) }
                                                    else {
                                                        const valueSplit = valueCurrency.split(",")
                                                        if (valueSplit.length > 0) valuePrice = { value: price, valueBR: valueSplit[0] }
                                                    }
                                                }
                                                setGrossPrice(valuePrice)
                                            }
                                        }} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={t('field.product.sale_price')} value={salePrice.valueBR} onChange={(e) => {
                                            const price = changePrice(e.target.value)
                                            if (price !== null) {
                                                let valuePrice = { value: "", valueBR: "" }
                                                if (price.toString() === "0") valuePrice = { value: '0', valueBR: `${VALUES_APP().APP.SYMBOL_CURRENCY} 0` }
                                                else {
                                                    const valueCurrency = FormatNumberToCurrencyBrlCustom(price)
                                                    if (price.indexOf(".") > -1) valuePrice = { value: price, valueBR: FormatNumberToCurrencyBrlCustom(price) }
                                                    else {
                                                        const valueSplit = valueCurrency.split(",")
                                                        if (valueSplit.length > 0) valuePrice = { value: price, valueBR: valueSplit[0] }
                                                    }
                                                }
                                                setSalePrice(valuePrice)
                                            }
                                        }} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <img crossOrigin="anonymous" alt="PRODUCT_PHOTO" src={productPhotoImage} style={{ width: '100%', height: 125, borderRadius: 7 }} />
                                    <input style={{ width: '100%', margin: 5 }} type="file" ref={filesElementProductPhoto} onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setStatusProductPhoto(1)
                                            setProductPhotoImage(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions>
                            <Grid container spacing={1}>
                                {statusProductPhoto !== 0 && <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => setRemoveProductPhoto(true)}
                                        fullWidth typeButton="danger" text={t('button.remove_photo')} startIcon="delete" />
                                </Grid>}
                                <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => clickUpdate(description, grossPrice.value, salePrice.value, statusProductPhoto, filesElementProductPhoto)}
                                        typeButton='success' fullWidth text={t('button.saved')} startIcon="check" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => clickBack()}
                                        typeButton='indigo' fullWidth text={t('button.back')} startIcon="arrow_back_ios" />
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageHeader>
        <DialogYesOrNot open={removeProductPhoto} onClose={() => setRemoveProductPhoto(false)} clickNot={() => setRemoveProductPhoto(false)}
            text={t('message.question.remove_photo')} clickYes={() => {
                setStatusProductPhoto(0)
                setProductPhotoImage(notImage)
                setRemoveProductPhoto(false)
            }} />
    </React.Fragment>
}

export default ProductEditView