import { Slide, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Box, Paper } from '../atoms';

const FooterCard = withStyles((theme) => ({
    default: {
        borderRadius: '25px'
    },
    rootMobile: {
        position: 'absolute',
        left: '0',
        width: '100%',
        height: '-moz-available',
        height: '-webkit-fill-available',
        height: 'fill-available',
    },
    mobileList: {
        height: 'fit-content',
        paddingBottom: '65px'
    },
    root: {
        height: 'fit-content',
        marginBottom: '20px'
    }
}))(({ classes, children }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [isDesktop, setIsDesktop] = useState(matches)
    const [bigList, isBigList] = useState(false)

    useEffect(() => {
        setIsDesktop(matches)

        if (document.getElementById("box-footer-card").offsetHeight > document.body.offsetHeight)
            isBigList(true)

    }, [matches, children])

    return (
        <Slide direction="up" timeout={500} in={true} mountOnEnter unmountOnExit>
            <Paper
                className={`${classes.default} ${isDesktop ? classes.root :
                    classes.rootMobile} ${!isDesktop && bigList && classes.mobileList}`}
                elevation={24}>
                <Box mb={0} pt={2} pb={2} id={"box-footer-card"}>
                    {children}
                </Box>
            </Paper>
        </Slide>

    )
})

export default FooterCard