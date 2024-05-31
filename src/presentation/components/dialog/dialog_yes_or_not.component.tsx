import React from 'react'
import { Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import ButtonCustom from '@components/button_custom.component'

const DialogYesOrNot: React.FC<{
    text?: string | null, open: boolean, onClose?: any, clickNot?: () => void, clickYes?: () => void, textYes?: string, textNot?: string,
    contentDialog?: string | null, contentWidget?: JSX.Element | null, style?: any
}> = (props) => {
    const { text, clickNot, clickYes, textYes = "Sim", textNot = "Não", contentDialog, contentWidget, ...other } = props

    const getContentDialog = () => typeof contentDialog === "string" ? <div dangerouslySetInnerHTML={{ __html: contentDialog }} /> : null

    const actionYes = () => (clickYes && clickYes !== null) ? clickYes() : () => { }

    const actionNot = () => (clickNot && clickNot !== null) ? clickNot() : () => { }

    return <Dialog {...other}>
        <DialogContent style={{ paddingBottom: 0 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {text && <Typography gutterBottom variant="h6" component="h6" style={{ fontWeight: 'bold', marginBottom: 8 }}>{text.toUpperCase()}</Typography>}
                    {contentDialog && getContentDialog()}
                    {contentWidget && contentWidget}
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <ButtonCustom
                        onClick={() => actionYes()}
                        fullWidth typeButton='success' text={textYes} size='small' />
                </Grid>
                <Grid item xs={6}>
                    <ButtonCustom
                        onClick={() => actionNot()}
                        fullWidth typeButton='danger' text={textNot} size='small' />
                </Grid>
            </Grid>
        </DialogActions>
    </Dialog>
}

export default DialogYesOrNot