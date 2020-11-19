import { makeStyles } from "@material-ui/core";
import React from "react";
import { reduxForm } from 'redux-form';
import { Box, Button, Col, Divider, Form, InputText } from "../atoms";
import { Field } from 'redux-form'


const useStylesForm = makeStyles((theme) => ({
    root: {
        width: "40ch"
    },
}))

const validate = values => {
    const errors = {};

    if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email))
        errors.email = 'Entre com um email válido!';

    const requiredFields = [
        'email',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Esse campo é obrigatório'
        }
    })

    return errors;
};

const PasswordRecoveryForm = (props) => {
    const classes = useStylesForm();

    const { handleSubmit, submitting, error } = props;

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)} className={classes.root} >
            <Box>
                <Field
                    component={InputText}
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                />
            </Box>
            <Box>
                <Button
                    disabled={submitting}
                    fullWidth
                    size="large">
                    Enviar Email
                </Button>
            </Box>
        </Form >
    )
}

export default reduxForm({
    form: 'PasswordRecoveryForm',
    validate
})(PasswordRecoveryForm)
