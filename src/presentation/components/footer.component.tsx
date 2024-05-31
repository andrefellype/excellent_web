import React from 'react';
import { Typography } from '@mui/material';

export const FooterTest: React.FC<{ sx?: any }> = (props) => {
    const { sx } = props

    return <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
        Copyright © {new Date().getFullYear()}{'.'}
    </Typography>
}