import { Snackbar } from '@material-ui/core';
import React from 'react';
import { Alert } from '..';

const Toast = (props) => (
    <Snackbar
        open={props.open}
        onClose={props.onClose}
        anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
        message={props.message}
        key={props.vertical + props.horizontal}>
        {!props.message ?
            <Alert
                severity={props.severity}
                onClose={props.onClose}
                title={props.title}>
                {props.alert}
            </Alert>
            : null}
    </Snackbar>
)

export default Toast