import React from "react";
import { Card, CardActions, FormControl, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserEntity } from "@entity";
import { FormatCellphone } from "@utils";
import PageHeader from "@components/page_header.component";
import ButtonCustom from "@components/button_custom.component";

const UserShowView: React.FC<{ user: UserEntity | null, redirectBack: () => void }> = (props) => {
    const { user, redirectBack } = props

    const { t } = useTranslation()

    const getCellphone = () => (user) ? (user.cellphone ? FormatCellphone(user.cellphone) : 'other.not_have') : ""

    return <PageHeader title={t('title.user.show')}>
        <Grid container spacing={2} direction="row">
            <Grid item lg={6} md={9} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={t('field.user.name')} value={user ? user.name : ""} InputProps={{ readOnly: true }} />
                                </FormControl>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={t('field.user.cellphone')} value={getCellphone()} InputProps={{ readOnly: true }} />
                                </FormControl>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={t('field.user.is_admin')} value={user ? (user.isAdmin ? t("other.yes") : t("other.not")) : ""} InputProps={{ readOnly: true }} />
                                </FormControl>
                            </Grid>
                            <Grid item xl={2} sm={3} xs={12}>
                                <ButtonCustom
                                    onClick={() => redirectBack()}
                                    fullWidth typeButton="indigo" startIcon="arrow_back_ios" text={t('button.back')} />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </PageHeader>
}

export default UserShowView