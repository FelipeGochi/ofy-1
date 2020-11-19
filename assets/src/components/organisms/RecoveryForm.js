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

    if (values.password && values.password.length < 6)
        errors.password = 'A senha deve ter mais de 6 digítos';

    if (values.password !== values.passwordConfirmation)
        errors.password = 'A senha não bate com a verificação, tente novamente';

    const requiredFields = [
        'password',
        'passwordConfirmation',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Esse campo é obrigatório'
        }
    })

    return errors;
};

const RecoveryForm = (props) => {
    const classes = useStylesForm();

    const { handleSubmit, submitting, error } = props;

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)} className={classes.root} >
            <Box>
                <Field
                    component={InputText}
                    id="password"
                    name="password"
                    label="Senha"
                    variant="outlined" 
                    type="password"
                    fullWidth
                />
            </Box>
            <Box>
                <Field
                    component={InputText}
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label="Confirmação da Senha"
                    variant="outlined" 
                    type="password"
                    fullWidth
                />
            </Box>
            <Box>
                <Button
                    disabled={submitting}
                    fullWidth
                    size="large">
                    Atualizar Senha
                </Button>
            </Box>
        </Form >
    )
}

export default reduxForm({
    form: 'RecoveryForm',
    validate
})(RecoveryForm)
