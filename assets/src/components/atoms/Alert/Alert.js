import React from 'react';
import { Alert as AlertMaterialUI, AlertTitle } from '@material-ui/lab';

const Alert = (props) => (
    <AlertMaterialUI
        onClose={props.handleClose}
        severity={props.severity || "success"}
        variant={props.variant || "filled"}>
        {
            !!props.title ?
                <AlertTitle>
                    {props.title}
                </AlertTitle>
                : null
        }
        { props.children}
    </AlertMaterialUI >
)

export default Alert