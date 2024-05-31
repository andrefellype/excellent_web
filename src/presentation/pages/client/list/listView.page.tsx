import React from "react";
import { ButtonGroup, Paper, Table, TableContainer, TableRow, Checkbox, Grid, FormControl, TextField, InputAdornment, IconButton, Icon, Dialog, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, Hidden } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ClientEntity } from "@entity";
import { ConvertDateTimeToString, FormatCnpj } from "@utils";
import ButtonCustom from "@components/button_custom.component";
import TableCellStyle from "@components/table/table_cell.component";
import DialogYesOrNot from "@components/dialog/dialog_yes_or_not.component";
import PageHeader from "@components/page_header.component";
import TableHeadStyle from "@components/table/table_head.component";
import TableBodyStyle from "@components/table/table_body.component";

const ClientListView: React.FC<{
    orderMain: string, loadingTable: any, clients: ClientEntity[],
    filterList: (search: string, order: string) => void, refreshList: () => void,
    clickNewRegister: () => void,
    clickEditClient: (clientId: number) => void,
    clickDeleteById: (userId: number) => void,
    clickDeleteByIds: (userIds: number[], callbackSuccess: () => void) => void
}> = (props) => {
    const {
        orderMain, loadingTable, clients, filterList, refreshList, clickNewRegister, clickEditClient, clickDeleteById, clickDeleteByIds
    } = props

    const { t } = useTranslation()

    const [clientIdDelete, setClientIdDelete] = React.useState<number | null>(null)
    const [clientIdsDelete, setClientIdsDelete] = React.useState<number[]>([])
    const [isOrder, setIsOrder] = React.useState(false)
    const [confirmDeleteSelected, setConfirmDeleteSelected] = React.useState(false)

    const [searchList, setSearchList] = React.useState<string>("")
    const [orderList, setOrderList] = React.useState<string>(orderMain)

    React.useEffect(() => {
        const idsDelete = clientIdsDelete.filter(id => clients.filter(client => client.id === id).length > 0)
        setClientIdsDelete(idsDelete)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients])

    const getDocumentNumberField = (client: ClientEntity) => (client.documentNumber) ? FormatCnpj(client.documentNumber) : t('other.not_have')

    const changeSearchList = (search: string) => {
        setSearchList(search)
        filterList(search, orderList)
    }

    const clickOrder = (order: string) => {
        setIsOrder(false)
        setOrderList(order)
        filterList(searchList, order)
    }

    const updateClientIdsDelete = (clientId: number, checkStatus: boolean) => {
        if (!checkStatus && clientIdsDelete.filter(id => id === clientId).length > 0) setClientIdsDelete(clientIdsDelete.filter(id => id !== clientId))
        if (checkStatus && clientIdsDelete.filter(id => id === clientId).length === 0) setClientIdsDelete([...clientIdsDelete, clientId])
    }

    const updateAllClientIdsDelete = (checkStatus: boolean) => {
        const ids = checkStatus ? clients.map(client => client.id) : []
        setClientIdsDelete(ids)
    }

    const dialogOrder = () => <Dialog open={isOrder} onClose={() => setIsOrder(true)}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup value={orderList} name="radio-buttons-group">
                            <FormControlLabel value="name" control={<Radio />} label={t('table.client.name')} onChange={() => clickOrder("name")} />
                            <FormControlLabel value="documentNumber" control={<Radio />} label={t('table.client.cnpj')} onChange={() => clickOrder("documentNumber")} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ButtonCustom
                        onClick={() => setIsOrder(false)}
                        fullWidth typeButton="danger" text={t('button.close')} />
                </Grid>
            </Grid>
        </DialogActions>
    </Dialog>

    const dialogDeleteById = () => <DialogYesOrNot open={clientIdDelete !== null} onClose={() => setClientIdDelete(null)} clickNot={() => setClientIdDelete(null)}
        clickYes={() => {
            if (clientIdDelete !== null) {
                const clientId = clientIdDelete
                setClientIdDelete(null)
                clickDeleteById(clientId)
            }
        }} text={t('message.question.delete_register')} />

    const dialogDeleteByIds = () => <DialogYesOrNot open={confirmDeleteSelected} onClose={() => setConfirmDeleteSelected(false)} clickNot={() => setConfirmDeleteSelected(false)}
        clickYes={() => {
            setConfirmDeleteSelected(false)
            if (clientIdsDelete.length > 0) clickDeleteByIds(clientIdsDelete, () => {
                setClientIdsDelete([])
            })
        }} text={clientIdsDelete.length === 1 ? t('message.question.delete_register') : t('message.question.delete_registers')} />

    const dialogs = () => <React.Fragment>
        {dialogOrder()}
        {dialogDeleteById()}
        {dialogDeleteByIds()}
    </React.Fragment>

    return <React.Fragment>
        <PageHeader title={t('title.client.list')}>
            <Grid container spacing={1}>
                <Grid item md={11} sm={10} xs={9}>
                    <FormControl fullWidth>
                        <TextField size="small" label={t('other.hint_search_name')} value={searchList} onChange={(e) => changeSearchList(e.target.value)} InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {searchList.length === 0 && <Icon>search</Icon>}
                                {searchList.length > 0 && <IconButton
                                    onClick={() => changeSearchList("")}
                                    edge="end">
                                    <Icon>close</Icon>
                                </IconButton>}
                                <Hidden smDown>
                                    <IconButton
                                        onClick={() => setIsOrder(true)}
                                        edge="end">
                                        <Icon>format_list_numbered_rtl</Icon>
                                    </IconButton>
                                </Hidden>
                                <IconButton
                                    onClick={() => refreshList()}
                                    edge="end">
                                    <Icon>refresh</Icon>
                                </IconButton>
                            </InputAdornment>
                        }} />
                    </FormControl>
                </Grid>
                <Grid item md={1} sm={2} xs={3}>
                    <ButtonCustom
                        onClick={() => clickNewRegister()}
                        typeButton="success" iconText="add" fullWidth size="large" />
                </Grid>
                {clientIdsDelete.length > 0 && <Grid item md={3} xs={12}>
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
                                        <Checkbox checked={clients.length > 0 && clientIdsDelete.length === clients.length}
                                            onChange={(e) => updateAllClientIdsDelete(e.target.checked)} />
                                    </TableCellStyle>
                                    <TableCellStyle>{t('table.client.name')}</TableCellStyle>
                                    <TableCellStyle width={200}>{t('table.client.cnpj')}</TableCellStyle>
                                    <TableCellStyle width={200}>{t('table.client.created')}</TableCellStyle>
                                    <TableCellStyle width={50} />
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle loading={loadingTable} colspan={4} values={clients}>
                                {clients.map((row) => <TableRow hover key={row.id}>
                                    <TableCellStyle align="center">
                                        <Checkbox checked={clientIdsDelete.filter(id => id === row.id).length > 0}
                                            onChange={(e) => updateClientIdsDelete(row.id, e.target.checked)} />
                                    </TableCellStyle>
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.name}
                                    </TableCellStyle>
                                    <TableCellStyle align="left">{getDocumentNumberField(row)}</TableCellStyle>
                                    <Hidden xlDown>
                                        <TableCellStyle align="left">{ConvertDateTimeToString(new Date(row.created), false)}</TableCellStyle>
                                    </Hidden>
                                    <TableCellStyle align="right">
                                        <ButtonGroup variant="contained">
                                            <ButtonCustom
                                                onClick={() => clickEditClient(row.id)}
                                                typeButton="indigo" size='small' iconText="edit" />
                                            <ButtonCustom
                                                onClick={() => setClientIdDelete(row.id)}
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

export default ClientListView