import { FormGroup } from '@material-ui/core';
import React from 'react';

const Form = (props) => (
    <form onSubmit={props.onSubmit} className={props.className}>
        <FormGroup
            className={props.className}
            row={props.row}
        >
            {props.children}
        </FormGroup>
    </form>
)

export default Form
