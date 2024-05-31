import React from "react";
import { Card, CardActions, FormControl, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MASK_CNPJ, MaskHelper } from "@utils";
import ButtonCustom from "@components/button_custom.component";
import PageHeader from "@components/page_header.component";
import { ClientEntity } from "@entity";

const ClientEditView: React.FC<{
    client: ClientEntity | null, redirectBack: () => void,
    clickRegister: (name: string, email: string) => void
}> = (props) => {
    const { client, redirectBack, clickRegister } = props

    const { t } = useTranslation()

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")

    const cnpjMask = new MaskHelper(MASK_CNPJ)

    React.useEffect(() => {
        if (client) {
            setName(client.name)
            setEmail(client.email)
        }
    }, [client])

    return <PageHeader title={`${t('title.client.edit')}${client ? ` - #${client.id}` : ""}`}>
        <Grid container spacing={2} direction="row">
            <Grid item lg={8} xs={12}>
                <Card elevation={5}>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.client.name')}*`} value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={3} sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={t('field.client.cnpj')} value={client ? cnpjMask.mask(client.documentNumber) : ""} InputProps={{ readOnly: true }} />
                                </FormControl>
                            </Grid>
                            <Grid item lg={9} sm={8} xs={12}>
                                <FormControl fullWidth>
                                    <TextField size="small" label={`${t('field.client.email')}*`} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item lg={2} sm={3} xs={12}>
                                        <ButtonCustom
                                            onClick={() => clickRegister(name, email)}
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

export default ClientEditView