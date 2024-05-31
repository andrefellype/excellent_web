/* eslint-disable react/jsx-props-no-spreading */
import { TableBody } from "@mui/material"
import React from "react"
import TableRowStyle from "@components/table/table_row.component"
import TableCellStyle from "@components/table/table_cell.component"
import { useTranslation } from "react-i18next";

const TableBodyStyle: React.FC<any> = (props) => {
    const { loading, colspan = 1, values = [], children, ...other } = props
    const { t } = useTranslation()

    const checkLoading = () => (loading && typeof loading.status !== "undefined") ? (loading.status ? 1 : 0) : -1

    const rowText = (text: string) => <TableRowStyle hover>
        <TableCellStyle colSpan={colspan} scope="row" align="left" sx={{ fontWeight: 'bold' }}>
            {t(text).toUpperCase()}
        </TableCellStyle>
    </TableRowStyle>

    const titleLoading = () => {
        let msgTitle = ""
        if (loading && typeof loading.status !== "undefined") {
            if (loading.status) msgTitle = loading.title
        } else msgTitle = t('message.alert.fail_system')
        return rowText(msgTitle)
    }

    const bodyFields = () => (!values || values.length === 0) ? rowText(t('message.list.list_empty')) : children

    return <TableBody {...other}>
        {checkLoading() !== 0 ? titleLoading() : (bodyFields())}
    </TableBody>
}

export default TableBodyStyle