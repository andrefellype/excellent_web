import React from 'react'
import { Card, CardActions, Grid, FormControl, TextField } from "@mui/material"
import { useTranslation } from "react-i18next";
import { notImage, VALUES_APP } from '@utils';
import ButtonCustom from '@components/button_custom.component';
import PageHeader from '@components/page_header.component';
import DialogYesOrNot from '@components/dialog/dialog_yes_or_not.component';
import { CategoryProductEntity } from '@entity';

const CategoryProductEditView: React.FC<{
    category: CategoryProductEntity | null, clickBack: () => void,
    clickUpdate: (name: string, statusCategoryIcon: -1 | 0 | 1, filesElementCategoryIcon: React.MutableRefObject<HTMLInputElement | null>) => void
}> = (props) => {
    const { category, clickBack, clickUpdate } = props

    const { t } = useTranslation()

    const [name, setName] = React.useState("")
    const [categoryIconImage, setCategoryIconImage] = React.useState(notImage)
    const [statusCategoryIcon, setStatusCategoryIcon] = React.useState<-1 | 0 | 1>(0)
    const [removeCategoryIcon, setRemoveCategoryIcon] = React.useState(false)

    const filesElementCategoryIcon = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
        if (category) {
            setName(category.name)
            setCategoryIconImage(category.iconPortrait !== null ? `${VALUES_APP().API.URL_FILES}/${category.iconPortrait}` : notImage)
            setStatusCategoryIcon(category.icon !== null ? -1 : 0)
        }
    }, [category])

    return <React.Fragment>
        <PageHeader title={t('title.category.product.edit')}>
            <Grid container spacing={2} direction="row">
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <Card elevation={5}>
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
                                        onClick={() => clickUpdate(name, statusCategoryIcon, filesElementCategoryIcon)}
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
        <DialogYesOrNot open={removeCategoryIcon} onClose={() => setRemoveCategoryIcon(false)} clickNot={() => setRemoveCategoryIcon(false)}
            text={t('message.category.remove_icon')} clickYes={() => {
                setStatusCategoryIcon(0)
                setCategoryIconImage(notImage)
                setRemoveCategoryIcon(false)
            }} />
    </React.Fragment>
}

export default CategoryProductEditView