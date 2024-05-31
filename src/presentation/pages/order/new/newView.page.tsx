import React from 'react'
import { Card, CardActions, Grid, FormControl, TextField, Dialog, DialogContent, TableContainer, Paper, Table, TableBody, DialogActions, InputAdornment, IconButton, Icon } from "@mui/material"
import { useTranslation } from "react-i18next";
import ButtonCustom from '@components/button_custom.component';
import PageHeader from '@components/page_header.component';
import { ClientEntity, ProductEntity } from '@entity';
import TableRowStyle from '@components/table/table_row.component';
import TableCellStyle from '@components/table/table_cell.component';

const ProductNewView: React.FC<{
    products: ProductEntity[], clients: ClientEntity[],
    clickSaveRegister: (quantity: number, productIds: number[], clientId: number | null, callbackSuccess: () => void) => void, clickToBack: () => void
}> = (props) => {
    const { products, clients, clickSaveRegister, clickToBack } = props

    const { t } = useTranslation()

    const [quantity, setQuantity] = React.useState("")
    const [productIds, setProductIds] = React.useState<number[]>([])
    const [clientId, setClientId] = React.useState<number | null>(null)
    const [isShowProducts, setIsShowProducts] = React.useState(false)
    const [isShowClients, setIsShowClients] = React.useState(false)

    const changeQuantity = (value: string) => {
        let valueNew = ""
        for (let v = 0; v < value.length; v++) {
            if (!Number.isNaN(parseInt(value[v], 10))) valueNew += value[v]
        }
        return valueNew.toString()
    }

    const dialogProducts = () => <Dialog fullWidth maxWidth="xs" open={isShowProducts} onClose={() => setIsShowProducts(false)}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {products.map((row, key) => <TableRowStyle hover key={key}>
                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                        {row.description}
                                    </TableCellStyle>
                                    <TableCellStyle width={25} align="center">
                                        {productIds.filter(p => p === row.id).length === 0 ?
                                            <ButtonCustom typeButton='success' iconText="check" size="small" onClick={() => setProductIds([...productIds, row.id])} /> :
                                            <ButtonCustom typeButton='danger' iconText="remove" size="small" onClick={() => setProductIds(productIds.filter(p => p !== row.id))} />}
                                    </TableCellStyle>
                                </TableRowStyle>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{ marginRight: 15 }}>
            <Grid container spacing={1}>
                <Grid item sm={9} xs={6} />
                <Grid item sm={3} xs={6}>
                    <ButtonCustom
                        onClick={() => setIsShowProducts(false)}
                        fullWidth typeButton='danger' text={t('button.close')} />
                </Grid>
            </Grid>
        </DialogActions>
    </Dialog>

    const dialogClients = () => <Dialog fullWidth maxWidth="xs" open={isShowClients} onClose={() => setIsShowClients(false)}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {clients.map((row, key) => <TableRowStyle hover key={key}>
                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                        {row.name}
                                    </TableCellStyle>
                                    <TableCellStyle width={25} align="center">
                                        {row.id !== clientId ?
                                            <ButtonCustom typeButton='success' iconText="check" size="small" onClick={() => setClientId(row.id)} /> :
                                            <ButtonCustom typeButton='danger' iconText="remove" size="small" onClick={() => setClientId(null)} />}
                                    </TableCellStyle>
                                </TableRowStyle>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{ marginRight: 15 }}>
            <Grid container spacing={1}>
                <Grid item sm={9} xs={6} />
                <Grid item sm={3} xs={6}>
                    <ButtonCustom
                        onClick={() => setIsShowClients(false)}
                        fullWidth typeButton='danger' text={t('button.close')} />
                </Grid>
            </Grid>
        </DialogActions>
    </Dialog>

    const getProductStr = () => {
        if (productIds.length > 0) return productIds.length.toString()
        return ""
    }

    const getClientStr = () => {
        const clientsFilter = clients.filter(c => c.id === clientId)
        if (clientsFilter.length > 0) return clientsFilter[0].name
        return ""
    }

    return <React.Fragment>
        <PageHeader title={t('title.order.new')}>
            < Grid container spacing={2} >
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={`${t('field.order.quantity')}*`} value={quantity} onChange={(e) => setQuantity(changeQuantity(e.target.value))} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={t('field.order.product')} value={getProductStr()} InputProps={{
                                            readOnly: true, endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setIsShowProducts(true)}
                                                    edge="end">
                                                    <Icon>arrow_drop_down</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField size="small" label={t('field.order.client')} value={getClientStr()} InputProps={{
                                            readOnly: true, endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setIsShowClients(true)}
                                                    edge="end">
                                                    <Icon>arrow_drop_down</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <ButtonCustom
                                        onClick={() => clickSaveRegister(quantity.length > 0 ? parseInt(quantity) : 0, productIds, clientId, () => {
                                            setQuantity("")
                                            setProductIds([])
                                            setClientId(null)
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
        {dialogProducts()}
        {dialogClients()}
    </React.Fragment >
}

export default ProductNewView