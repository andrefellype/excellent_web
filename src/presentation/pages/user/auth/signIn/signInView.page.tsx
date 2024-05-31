import React from "react";
import PageHeader from "@components/page_header.component";
import { Card, CardActions, FormControl, Grid, TextField } from "@mui/material";
import ButtonCustom from "@components/button_custom.component";
import { MaskHelper, MASK_CELLPHONE } from "@utils";
import { useTranslation } from "react-i18next";

const UserSignInView: React.FC<{
    redirectSignUp: () => void, clickSignin: (cellphone: string, password: string) => void
}> = (props) => {
    const { redirectSignUp, clickSignin } = props

    const { t } = useTranslation()

    const [cellphone, setCellphone] = React.useState("")
    const [password, setPassword] = React.useState("")

    const cellphoneMask = new MaskHelper(MASK_CELLPHONE)

    return <PageHeader title={t('title.main.access.signin')}>
        <Grid container spacing={2} direction="row">
            <Grid item lg={6} md={9} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.main.access.user_cellphone')}*`} value={cellphone} onChange={(e) => setCellphone(cellphoneMask.mask(e.target.value))} />
                                </FormControl>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" type="password" label={`${t('field.main.access.user_password')}*`} value={password} onChange={(e) => setPassword(e.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xl={3} md={4} sm={3} xs={12}>
                                        <ButtonCustom
                                            onClick={() => clickSignin(cellphoneMask.unmask(cellphone), password)}
                                            fullWidth typeButton="success" startIcon="check" text={t('button.main.access.signin')} />
                                    </Grid>
                                    <Grid item xl={6} lg={7} md={6} sm={6} xs={12}>
                                        <ButtonCustom
                                            onClick={() => redirectSignUp()}
                                            fullWidth typeButton="dark" startIcon="add_circle_outline" text={t('button.main.access.signup')} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </PageHeader>
}

export default UserSignInView