import React from "react";
import { Card, CardActions, FormControl, Grid, Icon, IconButton, InputAdornment, TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MASK_CELLPHONE, MaskHelper } from "@utils";
import ButtonCustom from "@components/button_custom.component";
import PageHeader from "@components/page_header.component";

const UserNewView: React.FC<{
    redirectBack: () => void,
    clickRegister: (name: string, cellphone: string, isAdmin: boolean, password: string, password_confirm: string, callbackSuccess: () => void) => void
}> = (props) => {
    const { redirectBack, clickRegister } = props

    const { t } = useTranslation()

    const [name, setName] = React.useState("")
    const [cellphone, setCellphone] = React.useState("")
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [passwordConfirm, setPasswordConfirm] = React.useState("")

    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)

    const cellphoneMask = new MaskHelper(MASK_CELLPHONE)

    return <PageHeader title={t('title.user.new')}>
        <Grid container spacing={2} direction="row">
            <Grid item md={12} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.user.name')}*`} value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={3} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.user.cellphone')}*`} value={cellphone}
                                        onChange={(e) => setCellphone(cellphoneMask.mask(e.target.value))} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={3} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" select label={t('field.user.is_admin')} value={isAdmin ? "1" : "0"}
                                        onChange={(e) => setIsAdmin(e.target.value === "1")}>
                                        <MenuItem value="0">{t('other.not')}</MenuItem>
                                        <MenuItem value="1">{t('other.yes')}</MenuItem>
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" type={showPassword ? "text" : "password"} label={`${t('field.user.password')}*`}
                                        value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end">
                                                        <Icon>{showPassword ? "visibility" : "visibility_off"}</Icon>
                                                    </IconButton>
                                                </InputAdornment>
                                        }} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={3} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" type={showPasswordConfirm ? "text" : "password"} label={`${t('field.user.confirm_password')}*`}
                                        value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                                        edge="end">
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
                                            onClick={() => clickRegister(name, cellphoneMask.unmask(cellphone), isAdmin, password, passwordConfirm, () => {
                                                setName("")
                                                setCellphone("")
                                                setIsAdmin(false)
                                                setPassword("")
                                                setPasswordConfirm("")
                                            })}
                                            fullWidth typeButton="success" startIcon="check" text={t('button.register')} />
                                    </Grid>
                                    <Grid item md={2} sm={3} xs={12}>
                                        <ButtonCustom
                                            onClick={() => redirectBack()}
                                            fullWidth typeButton="indigo" startIcon="arrow_back_ios" text={t('button.back')} />
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

export default UserNewView