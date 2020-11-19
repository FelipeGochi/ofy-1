import { makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row, Text } from "../atoms";
import { AlertWrapper, Header } from "../molecules";
import { RecoveryForm } from "../organisms";
import { WithStore } from "../../store";
import { cleanUserAlert, recovery } from "../../store/actions/UserAction";

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

const Recovery = (props) => {
  const { user } = props

  const classes = useStyles();

  const handleSubmit = async (values) => {
    props.cleanAlert()
    const { token } = props.match.params

    const data = {
      password: values.password,
      token: token
    }

    await props.recovery(data)
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
            Para recuperar a sua senha basta adicionar sua nova senha e confirmar! Após isso é só logar com sua nova senha.
          </Text>
          <RecoveryForm onSubmit={(values) => handleSubmit(values)} />
        </Col>
      </Row>
    </Container>
  )
}
export default withRouter(WithStore(Recovery,
  ['user'],
  [{ recovery: recovery, cleanAlert: cleanUserAlert }]))