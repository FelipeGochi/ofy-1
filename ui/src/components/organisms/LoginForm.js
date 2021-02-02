import { makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { reduxForm } from 'redux-form';
import { Box, Button, Col, Divider, Form, FullPage, InputText } from "../atoms";
import { Field } from 'redux-form'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";


const useStylesForm = makeStyles((theme) => ({
    root: {
        width: "40ch"
    },
    googleButton: {
        width: "100%",
        fontSize: "1.2rem !important",
        fontWeight: "bold !important",
        justifyContent: "center"
    }
}))

const validate = values => {
    const errors = {};

    if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.username))
        errors.username = 'Entre com um email válido!';

    if (values.password && values.password.length < 6)
        errors.password = 'A senha deve ter mais de 6 digítos';

    const requiredFields = [
        'username',
        'password',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Esse campo é obrigatório'
        }
    })

    return errors;
};

const LoginForm = (props) => {
    let history = useHistory();

    const classes = useStylesForm();

    const { handleSubmit, submitting } = props;

    const login = (response) => {
        props.cleanAlert();

        if (response.accessToken) {
            props.onGoogleSubmit(response.accessToken)
        }
    }

    const loginFailure = (response) => {
        console.log(response)
    }

    return (
        <Fragment>
            <FullPage open={submitting} />
            <Form onSubmit={handleSubmit(props.onSubmit)} className={classes.root} >
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
                    <Button
                        disabled={submitting}
                        fullWidth
                        size="large">
                        login
                </Button>
                </Box>
                <Box>
                    <Button
                        fullWidth
                        type="button"
                        size="large"
                        variant="text"
                        onClick={() => { props.cleanAlert(); history.push('/password-recovery') }}>
                        Esqueceu a senha?
                </Button>
                </Box>
                <Col>
                    <Box>
                        <Divider />
                    </Box>
                </Col>
                <Col>
                    <Box>
                        <Button
                            type="button"
                            size="large"
                            color="secondary"
                            fullWidth
                            onClick={() => { props.cleanAlert(); history.push('/signup') }}>
                            Crie sua conta!
                    </Button>
                    </Box>
                </Col>
                <Col>
                    <Box>
                        <GoogleLogin
                            clientId={'1041807202564-2bp54i0c8hfp9imulpji8fp29fs7iu3m.apps.googleusercontent.com'}
                            buttonText='Entre com o Google!'
                            onSuccess={login}
                            onFailure={loginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                            className={classes.googleButton}
                            type={'button'}
                        />
                    </Box>
                </Col>
            </Form >
        </Fragment>
    )
}

export default reduxForm({
    form: 'LoginForm',
    validate
})(LoginForm)
