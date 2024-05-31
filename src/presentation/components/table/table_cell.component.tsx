import React from 'react'
import { TableCell, styled } from "@mui/material"
import { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: { backgroundColor: "#D3D3D3", color: "#000000", fontWeight: 'bolder' }, [`&.${tableCellClasses.body}`]: { fontSize: 14 }
}))

const TableCellStyle: React.FC<any> = (props) => {
    const { children, ...other } = props
    return <StyledTableCell {...other}>{children}</StyledTableCell>
}

export default TableCellStyle