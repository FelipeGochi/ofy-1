import { SwipeableDrawer, withStyles } from "@material-ui/core";
import React from "react";

const ModalFooter = withStyles((theme) => ({
    paper: {
        borderRadius: '25px 25px 0 0',
        maxHeight: '85vh'
    }
}))((props) => {
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        props.change(open)
    };

    return (
        <SwipeableDrawer
            anchor={"bottom"}
            open={props.open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            classes={props.classes}
        >
            {props.children}
        </SwipeableDrawer>
    )
})

export default ModalFooter