import React from 'react'
import { Card, CardContent, Grid, Backdrop, CircularProgress, useTheme } from '@mui/material'
import { useTranslation } from "react-i18next";

export const LoadingBackdropTest: React.FC<{ loading: { title?: string | null } }> = (props) => {
    const { t } = useTranslation()

    const theme = useTheme()

    return <Backdrop open sx={{ zIndex: theme.zIndex.drawer + 1, color: '#fff' }}>
        <Card>
            <CardContent style={{ margin: 0, paddingLeft: 30, paddingTop: 30, paddingRight: 20 }}>
                <Grid container spacing={2} style={{ alignItems: 'center' }}>
                    <Grid item>
                        <CircularProgress color="primary" size={30} />
                    </Grid>
                    <Grid item style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {props.loading.title && t(props.loading.title)}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Backdrop>
}