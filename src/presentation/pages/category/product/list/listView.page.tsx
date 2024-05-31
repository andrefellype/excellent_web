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
import { CategoryProductEntity } from "@entity";

const CategoryProductListView: React.FC<{
    loadingTable: any, categories: CategoryProductEntity[], refreshList: () => void, filterList: (search: string) => void,
    clickNewRegister: () => void, clickEditCategory: (categoryId: number) => void,
    clickDeleteById: (categoryId: number) => void, clickDeleteByIds: (categoryIds: number[], callbackSuccess: () => void) => void
}> = (props) => {
    const { loadingTable, categories, refreshList, filterList, clickNewRegister, clickEditCategory, clickDeleteById, clickDeleteByIds } = props

    const { t } = useTranslation()

    const [categoryProductIdDelete, setCategoryProductIdDelete] = React.useState<number | null>(null)
    const [categoryProductIdsDelete, setCategoryProductIdsDelete] = React.useState<number[]>([])
    const [confirmDeleteSelected, setConfirmDeleteSelected] = React.useState(false)

    const [searchList, setSearchList] = React.useState<string>("")

    React.useEffect(() => {
        const idsDelete = categoryProductIdsDelete.filter(id => categories.filter(category => category.id === id).length > 0)
        setCategoryProductIdsDelete(idsDelete)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

    const changeSearchList = (search: string) => {
        setSearchList(search)
        filterList(search)
    }

    const updateCategoryProductIdsDelete = (categoryId: number, checkStatus: boolean) => {
        if (!checkStatus && categoryProductIdsDelete.filter(id => id === categoryId).length > 0)
            setCategoryProductIdsDelete(categoryProductIdsDelete.filter(id => id !== categoryId))
        if (checkStatus && categoryProductIdsDelete.filter(id => id === categoryId).length === 0)
            setCategoryProductIdsDelete([...categoryProductIdsDelete, categoryId])
    }

    const updateAllCategoryProductIdsDelete = (checkStatus: boolean) => {
        if (checkStatus) {
            const ids = categories.map(category => category.id)
            setCategoryProductIdsDelete(ids)
        } else setCategoryProductIdsDelete([])
    }

    const dialogDeleteById = () => <DialogYesOrNot open={categoryProductIdDelete !== null} onClose={() => setCategoryProductIdDelete(null)} clickNot={() => setCategoryProductIdDelete(null)}
        clickYes={() => {
            if (categoryProductIdDelete !== null) {
                const categoryId = categoryProductIdDelete
                setCategoryProductIdDelete(null)
                clickDeleteById(categoryId)
            }
        }} text={t('message.question.delete_register')} />

    const dialogDeleteByIds = () => <DialogYesOrNot open={confirmDeleteSelected} onClose={() => setConfirmDeleteSelected(false)} clickNot={() => setConfirmDeleteSelected(false)}
        clickYes={() => {
            setConfirmDeleteSelected(false)
            if (categoryProductIdsDelete.length > 0) clickDeleteByIds(categoryProductIdsDelete, () => {
                setCategoryProductIdsDelete([])
            })
        }} text={categoryProductIdsDelete.length === 1 ? t('message.question.delete_register') : t('message.question.delete_registers')} />

    const dialogs = () => <React.Fragment>
        {dialogDeleteById()}
        {dialogDeleteByIds()}
    </React.Fragment>

    const getIcon = (icon: string | null) => icon !== null ? `${VALUES_APP().API.URL_FILES}/${icon}` : notImage

    return <React.Fragment>
        <PageHeader title={t('title.category.product.list')}>
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
                {categoryProductIdsDelete.length > 0 && <Grid item lg={3} md={4} xs={12}>
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
                                        <Checkbox checked={categories.length > 0 && categoryProductIdsDelete.length === categories.length}
                                            onChange={(e) => updateAllCategoryProductIdsDelete(e.target.checked)} />
                                    </TableCellStyle>
                                    {categories.filter(c => c.icon !== null).length > 0 && <TableCellStyle width={50} />}
                                    <TableCellStyle>{t('table.category.product.name')}</TableCellStyle>
                                    <TableCellStyle width={50} />
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle loading={loadingTable} colspan={3} values={categories}>
                                {categories.map((row) => <TableRow key={row.id} hover>
                                    <TableCellStyle align="center">
                                        <Checkbox checked={categoryProductIdsDelete.filter(id => id === row.id).length > 0}
                                            onChange={(e) => updateCategoryProductIdsDelete(row.id, e.target.checked)} />
                                    </TableCellStyle>
                                    {categories.filter(c => c.icon !== null).length > 0 && <TableCellStyle scope="row" align="center">
                                        <img crossOrigin="anonymous" alt="VIBEAPP_ICON" src={getIcon(row.iconMiniature)} style={{ width: 25, height: 25, borderRadius: 7 }} />
                                    </TableCellStyle>}
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.name}
                                    </TableCellStyle>
                                    <TableCellStyle align="right">
                                        <ButtonGroup variant="contained">
                                            <ButtonCustom
                                                onClick={() => clickEditCategory(row.id)}
                                                typeButton="indigo" size='small' iconText="edit" />
                                            <ButtonCustom
                                                onClick={() => setCategoryProductIdDelete(row.id)}
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

export default CategoryProductListView