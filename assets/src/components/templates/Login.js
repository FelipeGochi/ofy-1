import { makeStyles } from "@material-ui/core";
import React from "react";
import { Col, Container, Row } from "../atoms";
import { AlertWrapper } from "../molecules";
import { LoginForm } from "../organisms";
import { WithStore } from "../../store";
import {
    cleanLoginAlert,
    login,
    loginSocialMedia
} from "../../store/actions/AuthAction";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: `${theme.spacing(8)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    form: {
        width: "40ch"
    },
    googleButton: {
        backgroundColor: "#de5145",
        color: "white"
    }
}));

const Login = (props) => {
    const { auth } = props
    const classes = useStyles();

    const handleSubmit = async (values, token) => {
        props.cleanAlert()

        if (token)
            await props.loginSocialMedia(token)
        else
            await props.login(values)
    }


    return (
        <Container fixed={true} className={classes.root}>
            <AlertWrapper data={auth} />
            <Row className={classes.form}>
                <Col>
                    <LoginForm
                        onSubmit={(values) => handleSubmit(values)}
                        onGoogleSubmit={(response) => handleSubmit(null, response)}
                        cleanAlert={props.cleanAlert} />
                </Col>
            </Row>
        </Container>
    )
}

export default WithStore(Login,
    ['auth', 'user'],
    [{
        'login': login,
        'loginSocialMedia': loginSocialMedia,
        'cleanAlert': cleanLoginAlert
    }])