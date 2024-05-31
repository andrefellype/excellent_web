import React from "react";
import { Card, CardActions, FormControl, Grid, Hidden, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserEntity } from "@entity";
import PageHeader from "@components/page_header.component";
import ButtonCustom from "@components/button_custom.component";
import { FormatCellphone } from "@utils";

const UserEditPasswordAuthView: React.FC<{
    user: UserEntity | null, clickUpdate: (password: string, password_confirm: string, callbackSuccess: () => void) => void
}> = (props) => {
    const { user, clickUpdate } = props

    const { t } = useTranslation()

    const [password, setPassword] = React.useState("")
    const [passwordConfirm, setPasswordConfirm] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)

    const getFieldCellphone = () => <FormControl fullWidth>
        <TextField size="small" label={t('field.user.cellphone')} value={user ? (user.cellphone ? FormatCellphone(user.cellphone) : t('other.not_have')) : ""} InputProps={{ readOnly: true }} />
    </FormControl>

    return <PageHeader title={t(`title.user.edit_password_auth`)}>
        <Grid container spacing={2} direction="row">
            <Grid item md={9} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item lg={8} sm={8} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={t('field.user.name')} value={user ? user.name : ""} InputProps={{ readOnly: true }} />
                                </FormControl>
                            </Grid>
                            <Hidden lgUp>
                                <Grid item sm={4} xs={12}>
                                    {getFieldCellphone()}
                                </Grid>
                            </Hidden>
                            <Hidden lgDown>
                                <Grid item sm={4} xs={12}>
                                    {getFieldCellphone()}
                                </Grid>
                            </Hidden>
                            <Grid item lg={4} sm={6} xs={12}>
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
                            <Grid item lg={4} sm={6} xs={12}>
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
                                            onClick={() => clickUpdate(password, passwordConfirm, () => {
                                                setPassword("")
                                                setPasswordConfirm("")
                                            })}
                                            fullWidth typeButton="success" startIcon="check" text={t('button.saved')} />
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

export default UserEditPasswordAuthView