import React from 'react'
import { Card, CardActions, Grid, FormControl, TextField } from "@mui/material"
import { useTranslation } from "react-i18next";
import { FormatNumberToCurrencyBrlCustom, notImage, VALUES_APP } from '@utils';
import ButtonCustom from '@components/button_custom.component';
import PageHeader from '@components/page_header.component';
import DialogYesOrNot from '@components/dialog/dialog_yes_or_not.component';

const ProductNewView: React.FC<{
    clickSaveRegister: (description: string, grossPrice: string, salePrice: string, statusProductPhoto: 0 | 1, filesElementProductPhoto: React.MutableRefObject<HTMLInputElement | null>,
        callbackSuccess: () => void) => void, clickToBack: () => void
}> = (props) => {
    const { clickSaveRegister, clickToBack } = props

    const { t } = useTranslation()

    const [description, setDescription] = React.useState("")
    const [grossPrice, setGrossPrice] = React.useState({ value: "", valueBR: "" })
    const [salePrice, setSalePrice] = React.useState({ value: "", valueBR: "" })
    const [productPhotoImage, setProductPhotoImage] = React.useState(notImage)
    const [statusProductPhoto, setStatusProductPhoto] = React.useState<0 | 1>(0)
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

    return <React.Fragment>
        <PageHeader title={t('title.product.new')}>
            < Grid container spacing={2} >
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <Card>
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
                                        onClick={() => clickSaveRegister(description, grossPrice.value, salePrice.value, statusProductPhoto, filesElementProductPhoto, () => {
                                            setDescription("")
                                            setGrossPrice({ value: "", valueBR: "" })
                                            setSalePrice({ value: "", valueBR: "" })
                                            setStatusProductPhoto(0)
                                            setProductPhotoImage(notImage)
                                            setRemoveProductPhoto(false)
                                        })}
                                        typeButton='success' fullWidth text={t('button.saved')} startIcon="check" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => clickToBack()}
                                        typeButton='indigo' fullWidth text={t('button.back')} startIcon="arrow_back_ios" />
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageHeader >
        <DialogYesOrNot open={removeProductPhoto} onClose={() => setRemoveProductPhoto(false)} clickNot={() => setRemoveProductPhoto(false)}
            text={t('message.question.remove_photo')} clickYes={() => {
                setStatusProductPhoto(0)
                setProductPhotoImage(notImage)
                setRemoveProductPhoto(false)
            }} />
    </React.Fragment >
}

export default ProductNewView