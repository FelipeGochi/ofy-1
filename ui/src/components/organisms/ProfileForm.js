import { makeStyles } from "@material-ui/core";
import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Box, Button, Circular, Col, Form, InputText, Row } from "../atoms";

const useStylesForm = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
}))

const validate = values => {
  const errors = {};

  if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email))
    errors.email = 'Entre com um email válido!';

  const requiredFields = [
    'name',
    'lastName',
    'email'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Esse campo é obrigatório'
    }
  })

  return errors;
};

const ProfileForm = (props) => {
  const classes = useStylesForm();

  const { handleSubmit, submitting, onCancel, openEdit, edit } = props;

  const renderButtons = () => {
    if (submitting) return <Circular />
    if (edit)
      return (
        <Row>
          <Col lg={6} md={6}>
            <Box>
              <Button
                disabled={submitting || !edit}
                fullWidth
                size="large">
                Salvar alterações
            </Button>
            </Box>
          </Col>
          <Col lg={6} md={6}>
            <Box>
              <Button
                disabled={submitting}
                fullWidth
                size="large"
                type="button"
                color="secondary"
                onClick={() => { openEdit(false); onCancel() }}>
                Cancelar
              </Button>
            </Box>
          </Col>
        </Row>)

    return (
      <Box>
        <Button
          disabled={submitting}
          fullWidth
          size="large"
          type="button"
          onClick={() => { openEdit(true); onCancel() }}>
          Editar
          </Button>
      </Box>
    )
  }

  return (
    <Form
      row={true}
      onSubmit={handleSubmit(props.onSubmit)}
      className={classes.root}>
      <Col
        lg={4}
        md={4}
        sm={12}
        xl={3}
        xs={12}>
        <Box>
          <Field
            component={InputText}
            id="firstName"
            name="firstName"
            label="Nome"
            variant="outlined"
            disabled={!edit}
            fullWidth
          />
        </Box>
      </Col>
      <Col
        lg={4}
        md={4}
        sm={12}
        xl={3}
        xs={12}>
        <Box>
          <Field
            component={InputText}
            id="lastName"
            name="lastName"
            label="Sobrenome"
            variant="outlined"
            disabled={!edit}
            fullWidth
          />
        </Box>
      </Col>
      <Col
        lg={4}
        md={4}
        sm={12}
        xl={3}
        xs={12}>
        <Box>
          <Field
            component={InputText}
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            disabled={true}
            fullWidth
          />
        </Box>
      </Col>
      <Col xs={12}>
        {renderButtons()}
      </Col>
    </Form >
  )
}

export default reduxForm({
  form: 'ProfileForm',
  validate,
  enableReinitialize: true
})(ProfileForm)
