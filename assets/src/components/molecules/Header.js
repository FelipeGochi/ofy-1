import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Image, Toolbar } from '../atoms';
import IconButton from '../atoms/buttons/IconButton';

const Header = (props) => (
    <AppBar position={props.position} className={props.className}>
        <Toolbar style={{ display: 'flex', justifyContent: props.isDesktop || props.backPage ? 'flex-start' : 'center' }}>
            {props.onClickMenuButton &&
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={props.onClickMenuButton}>
                    {props.backPage ? <ArrowBackIcon /> : <MenuIcon />}
                </IconButton>
            }
            {!props.backPage &&
                <Link to={'/'}>
                    <Image name={"logo-secondary"} alt={"Objectivefy - OFY"} style={{ height: "125px", marginTop: "-60px", marginBottom: "-60px" }} />
                </Link>}
        </Toolbar>
    </AppBar>
)

export default Header