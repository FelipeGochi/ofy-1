import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { AppBar, Toolbar } from '../atoms';
import IconButton from '../atoms/buttons/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Header = (props) => (
    <AppBar position={props.position} className={props.className}>
        <Toolbar>
            {props.onClickMenuButton &&
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={props.onClickMenuButton}>
                    {props.backPage ? <ArrowBackIcon /> : <MenuIcon />}
                </IconButton>}
        </Toolbar>
    </AppBar>
)

export default Header