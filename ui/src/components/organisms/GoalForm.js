import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { convert, isAfterDate, isBeforeToday } from "../../helpers/functions";
import { WithStore } from "../../store";
import { create, update } from "../../store/actions/GoalAction";
import { Box, Button, Circular, Col, Container, Form, InputDate, InputText, Paper, Row, Text } from "../atoms";
import { AlertWrapper } from "../molecules";

const validate = values => {
  const errors = {};

  const requiredFields = [
    'goal',
    'dateGoal'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Esse campo é obrigatório'
    }
  })

  return errors;
};

const GoalForm = (props) => {
  const {
    handleSubmit,
    goal,
    objective,
    submitting,
    createGoal,
    updateGoal,
  } = props

  const [addTasks, isAddTasks] = useState(false)
  const [tasksCount, addTasksCount] = useState(1)

  const submit = async (values) => {

    if (isBeforeToday(new Date(values.dateGoal)) ||
      isAfterDate(new Date(typeof values.dateGoal === String ? values.dateGoal.split('T')[0] : values.dateGoal),
        new Date(objective.current.dateObjective.split('-'))))
      return;

    const data = {
      "idObjective": objective.current.id,
      "goal": values.goal,
      "dateGoal": convert(new Date(values.dateGoal), 'yyyy-MM-dd'),
      "description": values.description
    }

    if (props.id) data['id'] = props.id

    const goal = props.id ? await updateGoal(data) : await createGoal(data)

    if (goal)
      props.onSuccess()
  }

  const renderAddGoal = () => {
    if (addTasks)
      return (
        <Fragment>
          {[...Array(tasksCount)].map((task, index) => (
            <Row key={index}>
              <Col>
                <Box>
                  <Field
                    component={InputText}
                    id={`task-${index}`}
                    name={`task-${index}`}
                    variant="outlined"
                    label="Qual é a tarefa?"
                    fullWidth
                  />
                </Box>
              </Col>
            </Row>
          ))}
          <Row>
            <Col lg={6} md={6}>
              <Box>
                <Button
                  fullWidth
                  disabled={submitting}
                  onClick={() => { addTasksCount(tasksCount + 1) }}
                  color="primary"
                  size="large"
                  type="button"
                >
                  {"Mais uma tarefa!"}
                </Button>
              </Box>
            </Col>
            <Col lg={6} md={6}>
              <Box>
                <Button
                  fullWidth
                  disabled={submitting}
                  onClick={() => { isAddTasks(false); addTasksCount(1) }}
                  color="secondary"
                  size="large"
                  type="button"
                >
                  {"Só a meta é suficiente..."}
                </Button>
              </Box>
            </Col>
          </Row>
        </Fragment>
      )

    return (
      <Fragment>
        <Text align={"center"} component={"h4"}>
          <strong>ESSA É UMA GRANDE META?</strong>
        </Text>
        <Text align={'center'}>
          {`Para um melhor controle, você pode adicionar `}<strong>{"TAREFAS"}</strong>.
        </Text>
        <Text align={'center'}>
          {"Com elas você dá mais atenção aos detalhes e gerencia tudo o que tem que ser feito para essa meta ser concluida!"}
        </Text>
      </Fragment>
    )
  }

  return (
    <Container>
      <AlertWrapper data={goal} />
      <Box p={1}>
        <Row>
          <Col>
            <Text align={"center"} variant={"h3"} component={"h1"}>
              Vamos construir sua <strong>META!</strong>
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
                  id="goal"
                  name="goal"
                  variant="outlined"
                  label="Qual é a sua meta?"
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
                  id="dateGoal"
                  name="dateGoal"
                  label="Quando você quer conquistar?"
                  minDate={new Date()}
                  minDateMessage={"A meta não pode ser cadastrado para dias antes de hoje."}
                  maxDate={new Date(objective.current.dateObjective.split('-'))}
                  maxDateMessage={"A meta não pode ser cadastrado para dias depois da conclusão do objetivo."}
                  fullWidth
                />
              </Box>
            </Col>
          </Row>
          {props.id &&
            <Row>
              <Col>
                <Box>
                  <Field
                    component={InputText}
                    id="description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    label="Anotações da meta"
                    fullWidth
                  />
                </Box>
              </Col>
            </Row>}
          <Row>
            <Col>
              <Paper>
                <Box p={2}>
                  {renderAddGoal()}
                </Box>
              </Paper>
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

export default reduxForm({
  form: 'GoalForm',
  validate
})(withRouter(
  WithStore(
    GoalForm,
    ['objective', 'goal'],
    [{
      'createGoal': create,
      'updateGoal': update
    }])
));

