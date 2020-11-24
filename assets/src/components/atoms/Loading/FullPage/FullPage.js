import { Backdrop } from '@material-ui/core';
import React from 'react';
import { Circular } from '../..';

const FullPage = (props) => (
    <Backdrop style={{
        zIndex: 1000000,
        color: '#fff',
    }} open={props.open} >
        <Circular />
    </Backdrop >
)

export default FullPage