import React from "react";
import IconButtonMaterialUi from '@material-ui/core/IconButton';

const IconButton = (props) => (
    <IconButtonMaterialUi
        id={props.id}
        className={props.className}
        ref={props.ref}
        color={props.color}
        disabled={props.disabled}
        disableFocusRipple={props.disableFocusRipple}
        disableRipple={props.disableRipple}
        size={props.size}
        onClick={props.onClick}
        component={props.component}
        variant={props.variant}>
        {props.children}
    </IconButtonMaterialUi>
)

export default IconButton