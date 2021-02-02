import React from "react";
import { Typography } from "@material-ui/core";


const Text = (props) => (
    <Typography
        className={props.className}
        align={props.align}
        color={props.color}
        component={props.component}
        display={props.display}
        gutterBottom={props.gutterBottom}
        noWrap={props.noWrap}
        paragraph={props.paragraph}
        variant={props.variant}
        variantMapping={props.variantMapping}
    >
        {props.children}
    </Typography>
)

export default Text