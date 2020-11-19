import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Box, Button, Col, Container, Paper, Row, Text } from "../atoms";
import { Accordion, AlertWrapper } from "../molecules";
import { AvatarForm, ProfileForm } from "../organisms";
import { WithStore } from "../../store";
import { get } from "../../store/actions/ApiAction";
import { logout } from "../../store/actions/AuthAction";
import { cleanUserAlert, update } from "../../store/actions/UserAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginTop: "12vh",
    marginBottom: 0,
    paddingBottom: '15px'
  },
}));

const Profile = (props) => {
  const { user, updateUser, cleanAlert, history } = props

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [edit, setEdit] = useState(false)
  const [desktop, setDesktop] = useState(matches)

  useEffect(() => {
    return () => { cleanAlert() }
  }, []);

  useEffect(() => {
    setDesktop(matches)
  }, [matches]);

  const handleUpdateUser = async (values) => {
    const data = {
      id: user.id,
      firstName: values.firstName,
      lastName: values.lastName,
    }

    const userUpdate = await updateUser(data)

    if (userUpdate)
      setEdit(false)
  }

  const handleCancelEdit = () => {
    cleanAlert()
  }

  const accordionItens = [{
    title: 'Dados Pessoais',
    id: 'personal-data',
    children:
      <Fragment>
        <Container disableGutters>
          <Row>
            <AlertWrapper data={user} />
          </Row>
          <Row>
            <Col>
              <ProfileForm
                onSubmit={(values) => handleUpdateUser(values)}
                onCancel={() => handleCancelEdit()}
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                }}
                openEdit={(value) => setEdit(value)}
                edit={edit} />
            </Col>
          </Row>
        </Container>
      </Fragment>
  }, {
    title: 'Troca de Senha',
    id: 'change-password',
    children: (
      <Text>
        Não se preocupe, estamos implementando essa funcionalidade para te atender melhor!
      </Text>
    )
  }, {
    title: 'Permissões',
    id: 'permissions',
    children: (
      <Text>
        Não se preocupe, estamos implementando essa funcionalidade para te atender melhor!
      </Text>
    )
  }]

  const classes = useStyles();

  const handleAvatarFormSubmit = () => { }

  return (
    <Container fixed={true} className={classes.root}>
      <Row>
        <Col>
          <Box>
            <AvatarForm user={user} onSubmit={handleAvatarFormSubmit} />
            <Text align={'center'} variant="h3" component="h2">
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </Text>
            <Text align={'center'}>
              {user.email}
            </Text>
          </Box>
          <div>
            {accordionItens.map(it => <Accordion key={it.id} {...it} />)}
          </div>
          {!desktop && (
            <Box>
              <Button
                fullWidth
                onClick={() => { props.logout(); history.push('/') }}
                color="secondary"
                type="button"
                startIcon="exit_to_app"
              >Logout</Button>
            </Box>
          )}
        </Col>
      </Row>
    </Container >
  )
}

export default withRouter(
  WithStore(
    Profile, ['user'], [{
      'get': get,
      'updateUser': update,
      'cleanAlert': cleanUserAlert,
      'logout': logout
    }]
  )
)