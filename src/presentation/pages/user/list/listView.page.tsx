import React from "react";
import { ButtonGroup, Paper, Table, TableContainer, TableRow, Checkbox, Grid, FormControl, TextField, InputAdornment, IconButton, Icon, Dialog, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, Hidden } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserEntity } from "@entity";
import { ConvertDateTimeToString, FormatCellphone } from "@utils";
import ButtonCustom from "@components/button_custom.component";
import TableCellStyle from "@components/table/table_cell.component";
import DialogYesOrNot from "@components/dialog/dialog_yes_or_not.component";
import PageHeader from "@components/page_header.component";
import TableHeadStyle from "@components/table/table_head.component";
import TableBodyStyle from "@components/table/table_body.component";

const UserListView: React.FC<{
    orderMain: string, loadingTable: any, users: UserEntity[],
    filterList: (search: string, order: string) => void, refreshList: () => void,
    clickNewRegister: () => void, showUser: (userId: number) => void,
    clickUpdateEnabled: (user: UserEntity) => void,
    clickDeleteById: (userId: number) => void,
    clickDeleteByIds: (userIds: number[], callbackSuccess: () => void) => void
}> = (props) => {
    const {
        orderMain, loadingTable, users, filterList, refreshList, clickNewRegister, showUser, clickUpdateEnabled, clickDeleteById, clickDeleteByIds
    } = props

    const { t } = useTranslation()

    const [userUpdateEnabled, setUserUpdateEnabled] = React.useState<UserEntity | null>(null)
    const [userIdDelete, setUserIdDelete] = React.useState<number | null>(null)
    const [userIdsDelete, setUserIdsDelete] = React.useState<number[]>([])
    const [isOrder, setIsOrder] = React.useState(false)
    const [confirmDeleteSelected, setConfirmDeleteSelected] = React.useState(false)

    const [searchList, setSearchList] = React.useState<string>("")
    const [orderList, setOrderList] = React.useState<string>(orderMain)

    React.useEffect(() => {
        const idsDelete = userIdsDelete.filter(id => users.filter(user => user.id === id).length > 0)
        setUserIdsDelete(idsDelete)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    const getCellphoneField = (user: UserEntity) => (user.cellphone) ? FormatCellphone(user.cellphone) : t('other.not_have')

    const changeSearchList = (search: string) => {
        setSearchList(search)
        filterList(search, orderList)
    }

    const clickOrder = (order: string) => {
        setIsOrder(false)
        setOrderList(order)
        filterList(searchList, order)
    }

    const updateUserIdsDelete = (userId: number, checkStatus: boolean) => {
        if (!checkStatus && userIdsDelete.filter(id => id === userId).length > 0) setUserIdsDelete(userIdsDelete.filter(id => id !== userId))
        if (checkStatus && userIdsDelete.filter(id => id === userId).length === 0) setUserIdsDelete([...userIdsDelete, userId])
    }

    const updateAllUserIdsDelete = (checkStatus: boolean) => {
        const ids = checkStatus ? users.map(user => user.id) : []
        setUserIdsDelete(ids)
    }

    const dialogOrder = () => <Dialog open={isOrder} onClose={() => setIsOrder(true)}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup value={orderList} name="radio-buttons-group">
                            <FormControlLabel value="name" control={<Radio />} label={t('table.user.name')} onChange={() => clickOrder("name")} />
                            <FormControlLabel value="cellphone" control={<Radio />} label={t('table.user.cellphone')} onChange={() => clickOrder("cellphone")} />
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

    const dialogUpdateEnabled = () => <DialogYesOrNot open={userUpdateEnabled !== null} onClose={() => setUserUpdateEnabled(null)} clickNot={() => setUserUpdateEnabled(null)}
        clickYes={() => {
            if (userUpdateEnabled !== null) {
                const userValue = userUpdateEnabled
                setUserUpdateEnabled(null)
                clickUpdateEnabled(userValue)
            }
        }} text={userUpdateEnabled !== null ? (userUpdateEnabled.isEnabled ? t('message.question.update_disabled') : t('message.question.update_enabled')) : ""} />

    const dialogDeleteById = () => <DialogYesOrNot open={userIdDelete !== null} onClose={() => setUserIdDelete(null)} clickNot={() => setUserIdDelete(null)}
        clickYes={() => {
            if (userIdDelete !== null) {
                const userId = userIdDelete
                setUserIdDelete(null)
                clickDeleteById(userId)
            }
        }} text={t('message.question.delete_register')} />

    const dialogDeleteByIds = () => <DialogYesOrNot open={confirmDeleteSelected} onClose={() => setConfirmDeleteSelected(false)} clickNot={() => setConfirmDeleteSelected(false)}
        clickYes={() => {
            setConfirmDeleteSelected(false)
            if (userIdsDelete.length > 0) clickDeleteByIds(userIdsDelete, () => {
                setUserIdsDelete([])
            })
        }} text={userIdsDelete.length === 1 ? t('message.question.delete_register') : t('message.question.delete_registers')} />

    const dialogs = () => <React.Fragment>
        {dialogOrder()}
        {dialogUpdateEnabled()}
        {dialogDeleteById()}
        {dialogDeleteByIds()}
    </React.Fragment>

    return <React.Fragment>
        <PageHeader title={t('title.user.list')}>
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
                {userIdsDelete.length > 0 && <Grid item md={3} xs={12}>
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
                                        <Checkbox checked={users.length > 0 && userIdsDelete.length === users.length}
                                            onChange={(e) => updateAllUserIdsDelete(e.target.checked)} />
                                    </TableCellStyle>
                                    <TableCellStyle>{t('table.user.name')}</TableCellStyle>
                                    <Hidden smDown>
                                        <TableCellStyle width={140}>{t('table.user.cellphone')}</TableCellStyle>
                                    </Hidden>
                                    <Hidden xlDown>
                                        <TableCellStyle width={150}>{t('table.user.created')}</TableCellStyle>
                                    </Hidden>
                                    <TableCellStyle width={50} />
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle loading={loadingTable} colspan={7} values={users}>
                                {users.map((row) => <TableRow hover key={row.id}>
                                    <TableCellStyle align="center">
                                        <Checkbox checked={userIdsDelete.filter(id => id === row.id).length > 0}
                                            onChange={(e) => updateUserIdsDelete(row.id, e.target.checked)} />
                                    </TableCellStyle>
                                    <TableCellStyle scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                                        {row.name}
                                    </TableCellStyle>
                                    <Hidden smDown>
                                        <TableCellStyle align="left">{getCellphoneField(row)}</TableCellStyle>
                                    </Hidden>
                                    <Hidden xlDown>
                                        <TableCellStyle align="left">{ConvertDateTimeToString(new Date(row.created), false)}</TableCellStyle>
                                    </Hidden>
                                    <TableCellStyle align="right">
                                        <ButtonGroup variant="contained">
                                            <ButtonCustom
                                                onClick={() => showUser(row.id)}
                                                typeButton="indigo" size='small' iconText="remove_red_eye" />
                                            {!row.isEnabled ?
                                                <ButtonCustom
                                                    onClick={() => setUserUpdateEnabled(row)}
                                                    typeButton="pink" size='small' iconText="lock" /> :
                                                <ButtonCustom
                                                    onClick={() => setUserUpdateEnabled(row)}
                                                    typeButton="success" size='small' iconText="lock_open" />}
                                            <ButtonCustom
                                                onClick={() => setUserIdDelete(row.id)}
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

export default UserListView