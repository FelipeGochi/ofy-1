import { Chip as ChipMaterialUi } from "@material-ui/core";
import React from "react";


const Chip = (props) => (
    <ChipMaterialUi
        icon={props.icon}
        label={props.label}
        clickable={props.clickable}
        color={props.color}
        onDelete={props.handleDelete}
        deleteIcon={props.deleteIcon}
        variant={props.variant}
        disabled={props.disabled}
        size={props.size}
        className={props.className}
        style={props.style}
    />
)

export default Chip