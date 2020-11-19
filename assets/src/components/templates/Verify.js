import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row, Text } from "../atoms";
import { AlertWrapper, Header } from "../molecules";
import { WithStore } from "../../store";
import { cleanUserAlert, verify } from "../../store/actions/UserAction";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: `${theme.spacing(8)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    form: {
        maxWidth: "40ch",
    },
}));

const Verify = (props) => {
    const { user, verify, history } = props
    const { token } = props.match.params

    useEffect(() => {
        if (!user.loading)
            if (user.success === null || !user.error === null)
                verify(token)
    }, [])

    const classes = useStyles();

    return (
        <Container fixed={true} className={classes.root}>
            <Header
                onClickMenuButton={() => { history.push('/'); props.cleanAlert() }}
                className={classes.basePage__AppBar}
                position="fixed"
                backPage />
            <Row direction='column'>
                <AlertWrapper data={user} />
            </Row>
        </Container>
    )
}
export default withRouter(WithStore(Verify,
    ['user'],
    [{ verify: verify, cleanAlert: cleanUserAlert }]))