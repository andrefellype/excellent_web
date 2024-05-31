import React from "react";
import { Paper, Table, TableContainer, TableRow, Grid, FormControl, TextField, InputAdornment, Icon, IconButton, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonCustom from "@components/button_custom.component";
import TableCellStyle from "@components/table/table_cell.component";
import DialogYesOrNot from "@components/dialog/dialog_yes_or_not.component";
import PageHeader from "@components/page_header.component";
import TableHeadStyle from "@components/table/table_head.component";
import TableBodyStyle from "@components/table/table_body.component";
import { OrderEntity } from "@entity";

const OrderListView: React.FC<{
    loadingTable: any, orders: OrderEntity[], refreshList: () => void,
    filterList: (search: string) => void, clickNewRegister: () => void,
    clickDeleteById: (orderId: number) => void, clickDeleteByIds: (orderIds: number[], callbackSuccess: () => void) => void
}> = (props) => {
    const { loadingTable, orders, refreshList, filterList, clickNewRegister, clickDeleteById, clickDeleteByIds } = props

    const { t } = useTranslation()

    const [orderIdDelete, setOrderIdDelete] = React.useState<number | null>(null)
    const [orderIdsDelete, setOrderIdsDelete] = React.useState<number[]>([])
    const [confirmDeleteSelected, setConfirmDeleteSelected] = React.useState(false)

    const [searchList, setSearchList] = React.useState<string>("")

    React.useEffect(() => {
        const idsDelete = orderIdsDelete.filter(id => orders.filter(order => order.id === id).length > 0)
        setOrderIdsDelete(idsDelete)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders])

    const changeSearchList = (search: string) => {
        setSearchList(search)
        filterList(search)
    }

    const updateOrderIdsDelete = (orderId: number, checkStatus: boolean) => {
        if (!checkStatus && orderIdsDelete.filter(id => id === orderId).length > 0)
            setOrderIdsDelete(orderIdsDelete.filter(id => id !== orderId))
        if (checkStatus && orderIdsDelete.filter(id => id === orderId).length === 0)
            setOrderIdsDelete([...orderIdsDelete, orderId])
    }

    const updateAllOrderIdsDelete = (checkStatus: boolean) => {
        if (checkStatus) {
            const ids = orders.map(order => order.id)
            setOrderIdsDelete(ids)
        } else setOrderIdsDelete([])
    }

    const dialogDeleteById = () => <DialogYesOrNot open={orderIdDelete !== null} onClose={() => setOrderIdDelete(null)} clickNot={() => setOrderIdDelete(null)}
        clickYes={() => {
            if (orderIdDelete !== null) {
                const orderId = orderIdDelete
                setOrderIdDelete(null)
                clickDeleteById(orderId)
            }
        }} text={t('message.question.delete_register')} />

    const dialogDeleteByIds = () => <DialogYesOrNot open={confirmDeleteSelected} onClose={() => setConfirmDeleteSelected(false)} clickNot={() => setConfirmDeleteSelected(false)}
        clickYes={() => {
            setConfirmDeleteSelected(false)
            if (orderIdsDelete.length > 0) clickDeleteByIds(orderIdsDelete, () => {
                setOrderIdsDelete([])
            })
        }} text={orderIdsDelete.length === 1 ? t('message.question.delete_register') : t('message.question.delete_registers')} />

    const dialogs = () => <React.Fragment>
        {dialogDeleteById()}
        {dialogDeleteByIds()}
    </React.Fragment>

    return <React.Fragment>
        <PageHeader title={t('title.order.list')}>
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
                {orderIdsDelete.length > 0 && <Grid item lg={3} md={4} xs={12}>
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
                                        <Checkbox checked={orders.length > 0 && orderIdsDelete.length === orders.length}
                                            onChange={(e) => updateAllOrderIdsDelete(e.target.checked)} />
                                    </TableCellStyle>
                                    <TableCellStyle width={100}>{t('table.order.quantity')}</TableCellStyle>
                                    <TableCellStyle>{t('table.order.product')}</TableCellStyle>
                                    <TableCellStyle>{t('table.order.client')}</TableCellStyle>
                                    <TableCellStyle width={50} />
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle loading={loadingTable} colspan={5} values={orders}>
                                {orders.map((row) => <TableRow key={row.id} hover>
                                    <TableCellStyle align="center">
                                        <Checkbox checked={orderIdsDelete.filter(id => id === row.id).length > 0}
                                            onChange={(e) => updateOrderIdsDelete(row.id, e.target.checked)} />
                                    </TableCellStyle>
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.quantity}
                                    </TableCellStyle>
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.product ? row.product.description : ""}
                                    </TableCellStyle>
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.client ? row.client.name : ""}
                                    </TableCellStyle>
                                    <TableCellStyle align="right">
                                        <ButtonCustom
                                            onClick={() => setOrderIdDelete(row.id)}
                                            typeButton="danger" size='small' iconText="delete" />
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

export default OrderListView