import React from "react"
import { TableHead } from "@mui/material"

const TableHeadStyle: React.FC<{ children: any }> = (props) => {
    const { children, ...other } = props
    
    return <TableHead {...other}>{children}</TableHead>
}

export default TableHeadStyle