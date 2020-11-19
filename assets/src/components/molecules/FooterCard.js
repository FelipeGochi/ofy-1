import { Slide, Toolbar, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Box, Paper } from '../atoms';

const FooterCard = withStyles((theme) => ({
    rootMobile: {
        borderRadius: '25px 25px 0px 0px',
        position: 'absolute',
        left: '0',
        width: '100%',
        height: 'fit-content'
    },
    root: {
        borderRadius: '25px 25px 0px 0px',
        height: 'fit-content'
    }
}))(({ classes, children }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [isDesktop, setIsDesktop] = useState(matches)

    useEffect(() => {
        setIsDesktop(matches)
    }, [matches])

    return (
        <Slide direction="up" timeout={500} in={true} mountOnEnter unmountOnExit>
            <Paper
                className={isDesktop && classes.root || classes.rootMobile}
                elevation={24}>
                <Box mb={0} pt={2}>
                    {children}
                    <Box pb={isDesktop && 40 || 45}>
                    </Box>
                </Box>
            </Paper>
        </Slide>

    )
})

export default FooterCard