import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { WithStore } from "../../store";
import { cleanTaskAlert, create, update } from "../../store/actions/TaskAction";
import { Box, Button, Circular, Col, Container, Form, InputText, Row, Text } from "../atoms";
import { AlertWrapper } from "../molecules";

const validate = values => {
  const errors = {};

  const requiredFields = [
    'task',
    'dateTask'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Esse campo é obrigatório'
    }
  })

  return errors;
};

const TaskForm = (props) => {
  const {
    handleSubmit,
    task,
    goal,
    objective,
    submitting,
    createTask,
    updateTask,
    cleanTaskAlert
  } = props

  useEffect(() => {
    cleanTaskAlert()
  }, [goal, props.id])

  const submit = async (values) => {
    const data = {
      "idObjective": objective.current.id,
      "idGoal": goal.id,
      "task": values.task,
      "description": values.descriptionTask
    }

    if (props.id) data['id'] = props.id

    const task = props.id ? await updateTask(data) : await createTask(data)

    if (task)
      props.onSuccess()
  }

  return (
    <Container>
      <AlertWrapper data={task} />
      <Box p={1}>
        <Row>
          <Col>
            <Text align={"center"} variant={"h3"} component={"h1"}>
              Vamos construir suas <strong>TAREFAS!</strong>
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
                  id="task"
                  name="task"
                  variant="outlined"
                  label="Qual é a sua tarefa?"
                  fullWidth
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col>
              <Box>
                <Field
                  component={InputText}
                  id="descriptionTask"
                  name="descriptionTask"
                  variant="outlined"
                  multiline
                  rows={4}
                  label="Anotações da tarefa"
                  fullWidth
                />
              </Box>
            </Col>
          </Row>
          {submitting ?
            <Circular size={50} /> :
            <Row>
              <Col>
                <Box>
                  <Button
                    fullWidth
                    disabled={submitting}
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

export default reduxForm({
  form: 'TaskForm',
  validate
})(withRouter(
  WithStore(
    TaskForm,
    ['objective', 'task'],
    [{
      'createTask': create,
      'updateTask': update,
      'cleanTaskAlert': cleanTaskAlert
    }])
));

