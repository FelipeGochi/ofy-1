import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Box, Container, Row } from '../..';

const Fill = (props) => (
    <Skeleton
        animation={props.animation || "wave"}
        children={props.children}
        height={props.height}
        variant={props.variant || "text"}
        width={props.width || "100%"}
    />
)

export default Fill