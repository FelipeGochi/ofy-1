import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Box } from '../atoms';

const useStyles = makeStyles((theme) => ({
    alert: {
        width: '60ch',
        [theme.breakpoints.down('sm')]: {
            width: '95vw',
        },
    }
}));

const AlertWrapper = ({ data }) => {
    const classes = useStyles();

    return (
        <Box>
            {data.error && data.error.component}
            {data.success && data.success.component}
        </Box>
    )
}

export default AlertWrapper