import React from "react"
import Button, { ButtonProps } from '@mui/material/Button'
import { Theme, styled } from "@mui/material/styles"
import { blue, green, common, blueGrey, red, indigo, pink, orange } from "@mui/material/colors"
import { Icon } from "@mui/material"

interface ButtonSuccessProps {
    typeButton?: "primary" | "secondary" | "success" | "dark" | "blueGrey" | "danger" | "white" | "indigo" | "pink" | "warning", text?: string,
    iconText?: string | any, startIcon?: string | any, fullWidth?: boolean, disabled?: boolean, variant?: 'text' | 'outlined' | 'contained',
    size?: 'small' | 'medium' | 'large', onClick?: any, style?: any
}

const ButtonCustom: React.FC<ButtonSuccessProps> = (props) => {
    const { typeButton, text = "", iconText, startIcon = "", fullWidth = false, disabled = false, size = "medium", variant = "contained", ...other } = props

    const getColorButton = (theme: Theme): { color: string, contraste: string, hover: string } => {
        switch (typeButton) {
            case "secondary":
                return { color: theme.palette.secondary.main, contraste: theme.palette.secondary.main, hover: theme.palette.secondary.main }
            case "success": return { color: green[500], contraste: blue[500], hover: green[700] }
            case "dark": return { color: common.black, contraste: common.black, hover: common.black }
            case "blueGrey": return { color: blueGrey[700], contraste: blueGrey[500], hover: blueGrey[700] }
            case "danger": return { color: red[500], contraste: red[500], hover: red[700] }
            case "white": return { color: common.white, contraste: common.white, hover: common.white }
            case "indigo": return { color: indigo[500], contraste: indigo[500], hover: indigo[700] }
            case "pink": return { color: pink[500], contraste: pink[500], hover: pink[700] }
            case "warning": return { color: orange[500], contraste: blue[500], hover: orange[700] }
            default: return { color: theme.palette.primary.main, contraste: theme.palette.primary.main, hover: theme.palette.primary.main }
        }
    }

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(getColorButton(theme).contraste), backgroundColor: getColorButton(theme).color,
        '&:hover': { backgroundColor: getColorButton(theme).hover }
    }))

    const getIcon = (icon: string | any) => ((typeof icon === "string") ? <Icon sx={{ marginRight: text ? 0.25 : 0 }}>{icon}</Icon> : ((typeof icon === "object") ? icon : null))

    return <ColorButton fullWidth={fullWidth} disabled={disabled} variant={variant}
        startIcon={startIcon && getIcon(startIcon)} size={size} {...other}>
        {getIcon(iconText)}{text}
    </ColorButton>
}

export default ButtonCustom