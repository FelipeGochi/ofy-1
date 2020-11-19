import React from "react";
import { Fab } from "@material-ui/core";

const FloatButton = (props) => (
    <Fab
        id={props.id}
        className={props.className}
        ref={props.ref}
        color={props.color}
        disabled={props.disabled}
        disableFocusRipple={props.disableFocusRipple}
        disableRipple={props.disableRipple}
        size={props.size}
        onClick={props.onClick}
        variant={props.variant}
        aria-label={props.ariaLabel}>
        {props.children}
    </Fab>
)

export default FloatButton