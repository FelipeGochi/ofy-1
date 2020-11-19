import React from 'react';
import { Box as BoxMaterialUI } from '@material-ui/core';

const Box = (props) => (
    <BoxMaterialUI
        m={props.m || 1}
        clone={props.clone}
        component={props.component}
        {...props}
    >
        {props.children}
    </BoxMaterialUI >
)

export default Box
