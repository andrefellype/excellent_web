import React from "react";
import { Card, CardActions, FormControl, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserEntity } from "@entity";
import { MASK_CELLPHONE, MaskHelper } from "@utils";
import PageHeader from "@components/page_header.component";
import ButtonCustom from "@components/button_custom.component";

const UserEditAuthView: React.FC<{ user: UserEntity | null, clickUpdate: (name: string, cellphone: string) => void }> = (props) => {
    const { user, clickUpdate } = props

    const { t } = useTranslation()

    const [name, setName] = React.useState("")
    const [cellphone, setCellphone] = React.useState("")

    const cellphoneMask = new MaskHelper(MASK_CELLPHONE)

    React.useEffect(() => {
        if (user !== null) {
            setName(user.name)
            setCellphone(user.cellphone ? cellphoneMask.mask(user.cellphone) : "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return <PageHeader title={t('title.user.edit_auth')}>
        <Grid container spacing={2} direction="row">
            <Grid item lg={8} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item sm={8} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.user.name')}*`} value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.user.cellphone')}*`} value={cellphone} onChange={(e) => setCellphone(cellphoneMask.mask(e.target.value))} />
                                </FormControl>
                            </Grid>
                            <Grid item xl={2} md={3} sm={4} xs={12}>
                                <ButtonCustom
                                    onClick={() => clickUpdate(name, cellphoneMask.unmask(cellphone))}
                                    fullWidth typeButton="success" startIcon="check" text={t('button.saved')} />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </PageHeader>
}

export default UserEditAuthView