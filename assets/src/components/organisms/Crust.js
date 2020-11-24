import { BottomNavigation, BottomNavigationAction, Icon, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Box, List, SideBar, Toolbar } from '../../components/atoms';
import { Header } from '../../components/molecules';
import { WithStore } from '../../store';
import { logout } from '../../store/actions/AuthAction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // margin: '72px 18px'
    },
    crustContent: {
        width: '100%'
    },
    bottomNavigation: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        position: 'fixed',
        bottom: '0px',
        width: '100vw',
    },
    bottomNavigationItem: {
        color: "white"
    },
    basePage__AppBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    basePage__drawer: {
        flexShrink: 0,
    },
    basePage__drawer_open: {
        width: drawerWidth,
    },
    basePage__drawer_paper: {
        width: drawerWidth,
        background: theme.palette.secondary.main,
    },
    basePage__drawer_container: {
        overflow: 'auto',
    }
}));

const Crust = (props) => {
    const anchor = "left"

    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const { history, location } = props

    const { pathname } = location

    const [open, setOpen] = useState(true);
    const [page, setPage] = useState(0)

    const menuProps = [
        {
            id: 'home',
            pathname: '/',
            icon: 'home',
            color: page === 0 && theme.palette.primary.main || 'white',
            text: 'Painel',
            index: 0,
            onClick: (index) => { setPage(index); history.push('/') },
            mobile: true
        },
        {
            id: 'profile',
            pathname: '/profile',
            icon: 'person',
            color: page === 1 && theme.palette.primary.main || 'white',
            text: 'Perfil',
            index: 1,
            onClick: (index) => { index && setPage(index); history.push('/profile') },
            mobile: true
        },
        {
            id: 'logout',
            pathname: '/logout',
            icon: 'exit_to_app',
            color: 'white',
            text: 'Logout',
            index: 2,
            onClick: () => { props.logout(); history.push('/') },
            mobile: false
        }
    ]

    useEffect(() => {
        const regex = new RegExp('/', 'g');

        const index = menuProps
            .findIndex(menuProp => menuProp.id === pathname.replace(regex, ''))
        setOpen(matches)
        setPage(index >= 0 ? index : 0)
    }, [matches, pathname])

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(!open);
    };

    return (
        <Fragment>
            <Header
                onClickMenuButton={matches && toggleDrawer(open)}
                className={classes.basePage__AppBar} position="fixed"
                isDesktop={matches} />
            {matches ?
                (<Fragment>
                    <div className={classes.root}>
                        <SideBar
                            className={open ?
                                `${classes.basePage__drawer} ${classes.basePage__drawer_open}` :
                                classes.basePage__drawer}
                            variant="persistent"
                            classes={{
                                paper: classes.basePage__drawer_paper,
                            }}
                            anchor={anchor}
                            open={open}
                        >
                            <Toolbar />
                            <div className={classes.basePage__drawer_container}>
                                <List list={menuProps} page={page} />
                            </div>
                        </SideBar>
                        <Box m={0} mt={8} className={classes.crustContent}>
                            {props.children}
                        </Box>
                    </div>
                </Fragment>) :
                (<Fragment>
                    <Toolbar />
                    {props.children}
                    <Toolbar />
                    <BottomNavigation
                        value={page}
                        onChange={(event, newValue) => {
                            const props = menuProps[newValue]
                            props.onClick(newValue)
                        }}
                        showLabels
                        className={classes.bottomNavigation}
                    >
                        {menuProps.map(props => (
                            props.mobile &&
                            <BottomNavigationAction
                                key={props.id}
                                className={classes.bottomNavigationItem}
                                label={props.text}
                                icon={(<Icon>{props.icon}</Icon>)} />
                        ))}
                    </BottomNavigation>
                </Fragment>)}
        </Fragment>
    )
}

export default withRouter(WithStore(Crust, ['auth', 'user'], [{ 'logout': logout }]))