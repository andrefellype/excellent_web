import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";

const PageHeader: React.FC<{
    title: string, titleBold?: boolean, alignText?: "auto" | "center" | "end" | "justify" | "left" | "right" | "start",
    xlValue?: number, lgValue?: number, mdValue?: number, smValue?: number, xsValue?: number, children?: any
}> = (props) => {
    const { title, titleBold = true, alignText = "left", children } = props

    const getSizeGrid = (type: "xl" | "lg" | "md" | "sm" | "xs") => {
        if (type === "xl" && props.xlValue) return props.xlValue
        if ((type === "lg" || type === "xl") && props.lgValue) return props.lgValue
        if ((type === "md" || type === "lg" || type === "xl") && props.mdValue) return props.mdValue
        if ((type === "sm" || type === "md" || type === "lg" || type === "xl") && props.smValue) return props.smValue
        if ((type === "xs" || type === "sm" || type === "md" || type === "lg" || type === "xl") && props.smValue) return props.xsValue
        return 12
    }

    return <React.Fragment>
        <Grid container spacing={0}>
            <Grid item xl={getSizeGrid("xl")} lg={getSizeGrid("lg")} md={getSizeGrid("md")} sm={getSizeGrid("sm")} xs={getSizeGrid("xs")}>
                <AppBar position="static" sx={{ marginBottom: 2 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ textAlign: alignText, flexGrow: 1, fontWeight: (titleBold ? 'bold' : 'normal') }}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
        {children}
    </React.Fragment>
}

export default PageHeader;
