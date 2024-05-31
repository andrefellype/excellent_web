import React from 'react'
import { Card, CardActions, Grid, FormControl, TextField } from "@mui/material"
import { useTranslation } from "react-i18next";
import { notImage } from '@utils';
import ButtonCustom from '@components/button_custom.component';
import PageHeader from '@components/page_header.component';
import DialogYesOrNot from '@components/dialog/dialog_yes_or_not.component';

const CategoryProductNewView: React.FC<{
    clickSaveRegister: (name: string, statusCategoryIcon: 0 | 1, filesElementCategoryIcon: React.MutableRefObject<HTMLInputElement | null>,
        callbackSuccess: () => void) => void, clickToBack: () => void
}> = (props) => {
    const { clickSaveRegister, clickToBack } = props

    const { t } = useTranslation()

    const [name, setName] = React.useState("")
    const [categoryIconImage, setCategoryIconImage] = React.useState(notImage)
    const [statusCategoryIcon, setStatusCategoryIcon] = React.useState<0 | 1>(0)
    const [removeCategoryIcon, setRemoveCategoryIcon] = React.useState(false)

    const filesElementCategoryIcon = React.useRef<HTMLInputElement | null>(null)

    return <React.Fragment>
        <PageHeader title={t('title.category.product.new')}>
            < Grid container spacing={2} >
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={`${t('field.category.product.name')}*`} value={name} onChange={(e) => setName(e.target.value)} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <img crossOrigin="anonymous" alt="CATEGORY_PRODUCT_ICON" src={categoryIconImage} style={{ width: '100%', height: 125, borderRadius: 7 }} />
                                    <input style={{ width: '100%', margin: 5 }} type="file" ref={filesElementCategoryIcon} onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setStatusCategoryIcon(1)
                                            setCategoryIconImage(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions>
                            <Grid container spacing={1}>
                                {statusCategoryIcon !== 0 && <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => setRemoveCategoryIcon(true)}
                                        fullWidth typeButton="danger" text={t('button.category.remove_icon')} startIcon="delete" />
                                </Grid>}
                                <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => clickSaveRegister(name, statusCategoryIcon, filesElementCategoryIcon, () => {
                                            setName("")
                                            setStatusCategoryIcon(0)
                                            setCategoryIconImage(notImage)
                                            setRemoveCategoryIcon(false)
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
        <DialogYesOrNot open={removeCategoryIcon} onClose={() => setRemoveCategoryIcon(false)} clickNot={() => setRemoveCategoryIcon(false)}
            text={t('message.category.remove_icon')} clickYes={() => {
                setStatusCategoryIcon(0)
                setCategoryIconImage(notImage)
                setRemoveCategoryIcon(false)
            }} />
    </React.Fragment >
}

export default CategoryProductNewView