import React from "react";
import Drawer from '@material-ui/core/Drawer';


const SideBar = (props) => (
    <Drawer
        className={props.className}
        classes={props.classes}
        anchor={props.anchor}
        ModalProps={props.ModalProps}
        open={props.open}
        variant={props.variant}
    >
        {props.children}
    </Drawer>
)

export default SideBar