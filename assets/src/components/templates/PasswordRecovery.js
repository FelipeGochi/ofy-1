import { makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Box, Col, Container, Row, Text } from "../atoms";
import { AlertWrapper, Header } from "../molecules";
import { PasswordRecoveryForm } from "../organisms";
import { WithStore } from "../../store";
import { cleanUserAlert, passwordRecovery } from "../../store/actions/UserAction";

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

const PasswordRecovery = (props) => {
  const { user } = props

  const classes = useStyles();

  const handleSubmit = async (values) => {
    props.cleanAlert()

    await props.passwordRecovery(values)
  }

  return (
    <Container fixed={true} className={classes.root}>
      <Header
        onClickMenuButton={() => { props.history.push('/'); props.cleanAlert() }}
        className={classes.basePage__AppBar}
        position="fixed"
        backPage />
      <Row direction='column'>
        <AlertWrapper data={user} />
        <Col className={classes.form}>
          <Text align={'center'} variant="h5" component="h1" gutterBottom>
            Para recuperar a sua senha basta preencher o seu email e te enviaremos um email para sua segurança.
          </Text>
          <PasswordRecoveryForm onSubmit={(values) => handleSubmit(values)} />
        </Col>
      </Row>
    </Container>
  )
}
export default withRouter(WithStore(PasswordRecovery,
  ['user'],
  [{ passwordRecovery: passwordRecovery, cleanAlert: cleanUserAlert }]))