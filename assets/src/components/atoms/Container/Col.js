import { Grid } from '@material-ui/core';
import React from 'react';

const Col = (props) => (
    <Grid
        id={props.id}
        className={props.className}
        ref={props.ref}
        component={props.component}
        spacing={props.spacing}
        classes={props.classes}
        zeroMinWidth={props.zeroMinWidth}
        lg={props.lg || props.col || 12}
        md={props.md || props.col || 12}
        sm={props.sm || props.col || 12}
        xl={props.xl || props.col || 12}
        xs={props.xs || props.col || 12}
        item={true}
        style={props.style}
    >
        {props.children}
    </Grid>
)

export default Col