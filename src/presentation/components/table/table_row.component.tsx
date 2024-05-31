import React from 'react'
import { TableRow, styled } from "@mui/material"

const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': { border: 0 }
}))

const TableRowStyle: React.FC<any> = (props) => {
    const { children, ...other } = props
    return <StyledTableRow {...other}>{children}</StyledTableRow>
}

export default TableRowStyle