import { makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Image, Row, Toolbar } from "../atoms";
import { AlertWrapper, Header } from "../molecules";
import { SignupForm } from "../organisms/";
import { WithStore } from "../../store";
import { cleanUserAlert, create } from "../../store/actions/UserAction";
// import { cleanSignupAlert, login, loginSocialMedia } from "../../store/actions/AuthAction";

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

const Signup = (props) => {
    const { user } = props
    const classes = useStyles();

    const handleSubmit = async (values) => {
        props.cleanAlert()

        await props.create(values)
    }

    return (
        <Container fixed={true} className={classes.root}>
            <Header
                onClickMenuButton={() => { props.history.push('/'); props.cleanAlert() }}
                className={classes.basePage__AppBar}
                position="fixed"
                backPage />
            <Row direction='column'>
                <Toolbar />
                <Image name={"logo"} alt={"Objectivefy - OFY"} style={{marginTop: "-90px", marginBottom: "-60px"}} />
                <AlertWrapper data={user} />
                <Col className={classes.form}>
                    <SignupForm
                        onSubmit={(values) => handleSubmit(values)} />
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(WithStore(Signup,
    ['user'],
    [{ create: create, cleanAlert: cleanUserAlert }]))