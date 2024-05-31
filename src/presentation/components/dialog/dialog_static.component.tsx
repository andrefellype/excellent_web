import React from 'react'
import { Dialog, DialogContent, Typography } from '@mui/material'

const DialogStatic: React.FC<{ message: string, open: boolean, style?: any, children?: any }> = (props) => {
    const { message, children, ...other } = props

    return <Dialog {...other}>
        <DialogContent>
            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }}>{message.toUpperCase()}</Typography>
            {children}
        </DialogContent>
    </Dialog>
}

export default DialogStatic