import React from "react";
import ButtonMaterialUi from '@material-ui/core/Button';
import Icon from "../Icon/Icon";

const Button = (props) => (
    <ButtonMaterialUi
        id={props.id}
        className={props.className}
        ref={props.ref}
        variant={props.variant || "contained"}
        size={props.size}
        type={props.type || "submit"}
        color={props.color || "primary"}
        disabled={props.disabled}
        onClick={props.onClick}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon && <Icon>{props.startIcon}</Icon>}
        endIcon={props.endIcon && <Icon>{props.endIcon}</Icon>}
        style={props.style}
    >
        {props.children}
    </ButtonMaterialUi>
)

export default Button