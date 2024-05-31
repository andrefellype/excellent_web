import React from "react";
import { Card, CardActions, FormControl, Grid, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MASK_CELLPHONE, MaskHelper } from "@utils";
import PageHeader from "@components/page_header.component";
import ButtonCustom from "@components/button_custom.component";

const UserSignUpView: React.FC<{
    redirectAuth: () => void, clickRegister: (name: string, cellphone: string, password: string, password_confirm: string) => void
}> = (props) => {
    const { redirectAuth, clickRegister } = props

    const { t } = useTranslation()

    const [name, setName] = React.useState("")
    const [cellphone, setCellphone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordConfirm, setPasswordConfirm] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)

    const cellphoneMask = new MaskHelper(MASK_CELLPHONE)

    return <PageHeader title={t('title.main.access.signup')}>
        <Grid container spacing={2} direction="row">
            <Grid item lg={9} md={12} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item lg={8} sm={8} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.main.access.user_name')}*`} value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.main.access.user_cellphone')}*`} value={cellphone} onChange={(e) => setCellphone(cellphoneMask.mask(e.target.value))} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={4} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" type={showPassword ? "text" : "password"} label={`${t('field.main.access.user_password')}*`}
                                        value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    <Icon>{showPassword ? "visibility" : "visibility_off"}</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={4} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" type={showPasswordConfirm ? "text" : "password"} label={`${t('field.main.access.user_confirm_password')}*`}
                                        value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} edge="end">
                                                    <Icon>{showPasswordConfirm ? "visibility" : "visibility_off"}</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item lg={2} sm={3} xs={12}>
                                        <ButtonCustom
                                            onClick={() => clickRegister(name, cellphoneMask.unmask(cellphone), password, passwordConfirm)}
                                            typeButton="success" fullWidth startIcon="check" text={t('button.register')} />
                                    </Grid>
                                    <Grid item lg={3} sm={4} xs={12}>
                                        <ButtonCustom
                                            onClick={() => redirectAuth()}
                                            fullWidth typeButton="blueGrey" startIcon="account_circle" text={t('button.access_area')} />
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

export default UserSignUpView