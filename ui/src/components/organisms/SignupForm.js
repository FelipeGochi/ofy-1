import { makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { reduxForm } from 'redux-form';
import { Box, Button, Form, FullPage, InputText } from "../atoms";
import { Field } from 'redux-form'

const useStylesForm = makeStyles((theme) => ({
    root: {
        width: "40ch"
    },
}))

const validate = values => {
    const errors = {};

    if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.username))
        errors.username = 'Entre com um email válido!';

    if (values.password && values.password.length < 6)
        errors.password = 'A senha deve ter mais de 6 digítos';

    if (values.password !== values.passwordConfirmation)
        errors.password = 'A senha não bate com a verificação, tente novamente';

    const requiredFields = [
        'name',
        'username',
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

const SignupForm = (props) => {
    const classes = useStylesForm();

    const { handleSubmit, submitting } = props;

    return (
        <Fragment>
            <FullPage open={submitting} />
            <Form onSubmit={handleSubmit(props.onSubmit)} className={classes.root} >
                <Box>
                    <Field
                        component={InputText}
                        id="name"
                        name="name"
                        label="Nome"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Field
                        component={InputText}
                        id="lastName"
                        name="lastName"
                        label="Sobrenome"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Field
                        component={InputText}
                        id="username"
                        name="username"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Field
                        component={InputText}
                        id="password"
                        name="password"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Field
                        component={InputText}
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        label="Confirmação da Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Button
                        disabled={submitting}
                        fullWidth
                        size="large">
                        Cadastrar!
                </Button>
                </Box>
            </Form >
        </Fragment>
    )
}

export default reduxForm({
    form: 'SignupForm',
    validate
})(SignupForm)
