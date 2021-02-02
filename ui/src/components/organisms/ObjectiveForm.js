import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { convert, getDifficulty, isBeforeToday, lessThenDays } from "../../helpers/functions";
import { WithStore } from "../../store";
import { create, update } from "../../store/actions/ObjectiveAction";
import { Box, Button, Circular, Col, Container, Form, InputText, Row, Text } from "../atoms";
import { InputDate } from "../atoms";
import { AlertWrapper } from "../molecules";

const validate = values => {
  const errors = {};

  if (lessThenDays(new Date(values.dateObjective), 1))
    errors.dateObjective = '';

  const requiredFields = [
    'objective',
    'dateObjective'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Esse campo é obrigatório'
    }
  })

  return errors;
};

const ObjectiveForm = (props) => {
  const {
    handleSubmit,
    objective,
    history,
    submitting,
    createObjective,
    updateObjective
  } = props

  const dateObjective = new Date(props.dateObjective)

  const submit = async (values) => {

    if (isBeforeToday(new Date(values.dateObjective)))
      return;

    const data = {
      "objective": values.objective,
      "dateObjective": convert(new Date(values.dateObjective), 'yyyy-MM-dd'),
      "dificulty": getDifficulty(dateObjective).value
    }

    if (props.id) data['id'] = props.id

    const objective = props.id ? await updateObjective(data) : await createObjective(data)

    if (objective && props.id)
      props.onSuccess()
    else if (objective && !props.id)
      history.push(`/objective/${objective.id}`)
  }

  return (
    <Container>
      <AlertWrapper data={objective} />
      <Box p={1}>
        <Row>
          <Col>
            <Text align={"center"} variant={"h3"} component={"h1"}>
              Vamos construir o seu <strong>OBJETIVO!</strong>
            </Text>
          </Col>
        </Row>
      </Box>
      <Form
        onSubmit={handleSubmit(submit)}>
        <Box mt={3} mb={3}>
          <Row>
            <Col>
              <Box>
                <Field
                  component={InputText}
                  id="objective"
                  name="objective"
                  variant="outlined"
                  label="O que você quer conquistar?"
                  fullWidth
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col>
              <Box>
                <Field
                  component={InputDate}
                  id="dateObjective"
                  name="dateObjective"
                  label="Quando você quer conquistar?"
                  minDate={new Date()}
                  minDateMessage={"O objetivo não pode ser cadastrado para dias antes de hoje."}
                  fullWidth
                />
              </Box>
            </Col>
          </Row>
          {objective.loading ?
            <Circular size={50} /> :
            <Row>
              <Col>
                <Box>
                  <Button
                    fullWidth
                    disabled={submitting}
                    // onClick={() => { history.push('/objective') }}
                    color="primary"
                    size="large"
                  >
                    Salvar
                </Button>
                </Box>
              </Col>
            </Row>}
        </Box>
      </Form>
    </Container>
  )
}

const selector = formValueSelector("ObjectiveForm");

export default connect(state => ({
  dateObjective: selector(state, "dateObjective")
}))(
  reduxForm({
    form: 'ObjectiveForm',
    validate,
    initialValues: {
      dateObjective: new Date()
    }
  })(withRouter(
    WithStore(
      ObjectiveForm,
      ['objective', 'user'],
      [{
        'createObjective': create,
        'updateObjective': update
      }])
  )));

