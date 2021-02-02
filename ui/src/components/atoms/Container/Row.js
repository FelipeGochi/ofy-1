import { Grid } from '@material-ui/core';
import React from 'react';

const Row = (props) => (
    <Grid
        id={props.id}
        className={props.className}
        ref={props.ref}
        component={props.component}
        spacing={props.spacing}
        wrap={props.wrap}
        alignContent={props.alignContent || 'center'}
        alignItems={props.alignItems || 'center'}
        direction={props.direction}
        justify={props.justify || 'center'}
        classes={props.classes}
        zeroMinWidth={props.zeroMinWidth}
        lg={props.lg}
        md={props.md}
        sm={props.sm}
        xl={props.xl}
        xs={props.xs}
        container={true}
    >
        {props.children}
    </Grid>
)

export default Row