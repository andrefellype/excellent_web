import React from "react";
import { ButtonGroup, Paper, Table, TableContainer, TableRow, Grid, FormControl, TextField, InputAdornment, Icon, IconButton, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonCustom from "@components/button_custom.component";
import TableCellStyle from "@components/table/table_cell.component";
import DialogYesOrNot from "@components/dialog/dialog_yes_or_not.component";
import PageHeader from "@components/page_header.component";
import TableHeadStyle from "@components/table/table_head.component";
import TableBodyStyle from "@components/table/table_body.component";
import { notImage, VALUES_APP } from "@utils";
import { ProductEntity } from "@entity";

const ProductListView: React.FC<{
    loadingTable: any, products: ProductEntity[], refreshList: () => void, filterList: (search: string) => void,
    clickNewRegister: () => void, clickEditProduct: (productId: number) => void,
    clickDeleteById: (productId: number) => void, clickDeleteByIds: (productIds: number[], callbackSuccess: () => void) => void
}> = (props) => {
    const { loadingTable, products, refreshList, filterList, clickNewRegister, clickEditProduct, clickDeleteById, clickDeleteByIds } = props

    const { t } = useTranslation()

    const [productIdDelete, setProductIdDelete] = React.useState<number | null>(null)
    const [productIdsDelete, setProductIdsDelete] = React.useState<number[]>([])
    const [confirmDeleteSelected, setConfirmDeleteSelected] = React.useState(false)

    const [searchList, setSearchList] = React.useState<string>("")

    React.useEffect(() => {
        const idsDelete = productIdsDelete.filter(id => products.filter(product => product.id === id).length > 0)
        setProductIdsDelete(idsDelete)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    const changeSearchList = (search: string) => {
        setSearchList(search)
        filterList(search)
    }

    const updateProductIdsDelete = (productId: number, checkStatus: boolean) => {
        if (!checkStatus && productIdsDelete.filter(id => id === productId).length > 0)
            setProductIdsDelete(productIdsDelete.filter(id => id !== productId))
        if (checkStatus && productIdsDelete.filter(id => id === productId).length === 0)
            setProductIdsDelete([...productIdsDelete, productId])
    }

    const updateAllProductIdsDelete = (checkStatus: boolean) => {
        if (checkStatus) {
            const ids = products.map(category => category.id)
            setProductIdsDelete(ids)
        } else setProductIdsDelete([])
    }

    const dialogDeleteById = () => <DialogYesOrNot open={productIdDelete !== null} onClose={() => setProductIdDelete(null)} clickNot={() => setProductIdDelete(null)}
        clickYes={() => {
            if (productIdDelete !== null) {
                const productId = productIdDelete
                setProductIdDelete(null)
                clickDeleteById(productId)
            }
        }} text={t('message.question.delete_register')} />

    const dialogDeleteByIds = () => <DialogYesOrNot open={confirmDeleteSelected} onClose={() => setConfirmDeleteSelected(false)} clickNot={() => setConfirmDeleteSelected(false)}
        clickYes={() => {
            setConfirmDeleteSelected(false)
            if (productIdsDelete.length > 0) clickDeleteByIds(productIdsDelete, () => {
                setProductIdsDelete([])
            })
        }} text={productIdsDelete.length === 1 ? t('message.question.delete_register') : t('message.question.delete_registers')} />

    const dialogs = () => <React.Fragment>
        {dialogDeleteById()}
        {dialogDeleteByIds()}
    </React.Fragment>

    const getPhoto = (photo: string | null) => photo !== null ? `${VALUES_APP().API.URL_FILES}/${photo}` : notImage

    return <React.Fragment>
        <PageHeader title={t('title.product.list')}>
            <Grid container spacing={1}>
                <Grid item lg={11} sm={10} xs={12}>
                    <FormControl fullWidth>
                        <TextField size="small" label={t('other.hint_search_name')} value={searchList} onChange={(e) => changeSearchList(e.target.value)} InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {searchList.length === 0 && <Icon>search</Icon>}
                                {searchList.length > 0 && <IconButton
                                    onClick={() => changeSearchList("")}
                                    edge="end">
                                    <Icon>close</Icon>
                                </IconButton>}
                                <IconButton
                                    onClick={() => refreshList()}
                                    edge="end">
                                    <Icon>refresh</Icon>
                                </IconButton>
                            </InputAdornment>
                        }} />
                    </FormControl>
                </Grid>
                <Grid item lg={1} sm={2} xs={12}>
                    <ButtonCustom
                        onClick={() => clickNewRegister()}
                        typeButton="success" iconText="add" fullWidth size="large" />
                </Grid>
                {productIdsDelete.length > 0 && <Grid item lg={3} md={4} xs={12}>
                    <ButtonCustom
                        onClick={() => setConfirmDeleteSelected(true)}
                        typeButton="danger" text={t('button.delete_selecteds')} fullWidth />
                </Grid>}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHeadStyle>
                                <TableRow>
                                    <TableCellStyle width={25}>
                                        <Checkbox checked={products.length > 0 && productIdsDelete.length === products.length}
                                            onChange={(e) => updateAllProductIdsDelete(e.target.checked)} />
                                    </TableCellStyle>
                                    {products.filter(c => c.photo !== null).length > 0 && <TableCellStyle width={50} />}
                                    <TableCellStyle>{t('table.product.description')}</TableCellStyle>
                                    <TableCellStyle width={50} />
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle loading={loadingTable} colspan={3} values={products}>
                                {products.map((row) => <TableRow key={row.id} hover>
                                    <TableCellStyle align="center">
                                        <Checkbox checked={productIdsDelete.filter(id => id === row.id).length > 0}
                                            onChange={(e) => updateProductIdsDelete(row.id, e.target.checked)} />
                                    </TableCellStyle>
                                    {products.filter(c => c.photo !== null).length > 0 && <TableCellStyle scope="row" align="center">
                                        <img crossOrigin="anonymous" alt="VIBEAPP_ICON" src={getPhoto(row.photoMiniature)} style={{ width: 25, height: 25, borderRadius: 7 }} />
                                    </TableCellStyle>}
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.description}
                                    </TableCellStyle>
                                    <TableCellStyle align="right">
                                        <ButtonGroup variant="contained">
                                            <ButtonCustom
                                                onClick={() => clickEditProduct(row.id)}
                                                typeButton="indigo" size='small' iconText="edit" />
                                            <ButtonCustom
                                                onClick={() => setProductIdDelete(row.id)}
                                                typeButton="danger" size='small' iconText="delete" />
                                        </ButtonGroup>
                                    </TableCellStyle>
                                </TableRow>)}
                            </TableBodyStyle>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </PageHeader>
        {dialogs()}
    </React.Fragment>
}

export default ProductListView