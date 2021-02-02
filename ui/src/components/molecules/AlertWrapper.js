import React from 'react';
import { Box } from '../atoms';

const AlertWrapper = ({ data }) => {

    return (
        <Box>
            {data.error && data.error.component}
            {data.success && data.success.component}
        </Box>
    )
}

export default AlertWrapper