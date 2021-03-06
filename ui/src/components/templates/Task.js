import { makeStyles, useTheme } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { isEmpty } from "../../helpers/functions";
import { WithStore } from "../../store";
import { cleanTaskAlert, done, list, remove } from "../../store/actions/TaskAction";
import { Box, Button, Circular, Col, Container, FloatButton, Icon, ModalFooter, Row, Text } from "../atoms";
import { Accordion, Confirmation } from "../molecules";
import { TaskForm } from "../organisms";

const useStyles = makeStyles((theme) => ({
  successButton: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    '&:hover': {
      backgroundColor: theme.palette.success.light
    },
  }
}));

const Task = (props) => {
  const {
    task,
    goal,
    listTasks,
    removeTask,
    doneTask,
    match,
    cleanTaskAlert
  } = props

  const classes = useStyles()

  const { id } = match.params

  const [createTask, isCreateTask] = useState(false)
  const [editTask, isEditTask] = useState(false)
  const [dropTask, isDropTask] = useState(false)
  const [taskDone, isTaskDone] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const theme = useTheme()

  useEffect(() => {
    cleanTaskAlert()

    listTasks(id, goal.id)
  }, [cleanTaskAlert, goal.id, id, listTasks])

  const renderTaskList = () => task.loading ? <Circular /> :
    (
      <Fragment>
        <Text component={"h4"}>
          <strong>{"Tarefas:"}</strong>
        </Text>
        {task
          .list
          .sort((curr, next) => curr.done - next.done)
          .map((task, index) => ({
            title: task.task,
            id: task.id,
            done: task.done,
            children:
              <Fragment>
                <Box>
                  <Container>
                    <Row>
                      <Col>
                        <Text>
                          <strong>
                            {"Andamento: "}
                          </strong>
                          {task.description}
                        </Text>
                      </Col>
                    </Row>
                  </Container>
                  {!task.done &&
                    <Container>
                      <Row>
                        <Col>
                          <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}>
                            <Box ml={0}>
                              <Button
                                fullWidth
                                color="secondary"
                                type="button"
                                className={classes.successButton}
                                onClick={() => { isTaskDone(true); setSelectedTask(task) }}
                              >
                                {"CONCLUIR!"}
                              </Button>
                            </Box>
                            <Box>
                              <FloatButton
                                size="small"
                                color="primary"
                                aria-label="edit"
                                onClick={() => { isEditTask(true); setSelectedTask(task) }}>
                                <Icon>create</Icon>
                              </FloatButton>
                            </Box>
                            <Box>
                              <FloatButton
                                size="small"
                                color="secondary"
                                aria-label="delete"
                                onClick={() => { isDropTask(true); setSelectedTask(task) }}>
                                <Icon>delete</Icon>
                              </FloatButton>
                            </Box>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  }
                </Box>
              </Fragment>
          }))
          .map(it =>
            <Accordion styleHeader={{
              background: it.done && theme.palette.success.light,
            }} key={it.id} {...it} />)
        }
      </Fragment>)

  return (
    <Fragment>
      {isEmpty(task.list)
        && !goal.done
        && !task.loading ?
        <Box>
          <Row>
            <Col>
              <Text align={"center"} component={"h4"}>
                <strong>ESSA ?? UMA GRANDE META?</strong>
              </Text>
              <Text align={'center'}>
                {`Para um melhor controle, voc?? pode adicionar `}<strong>TAREFAS</strong>.
                      </Text>
              <Text align={'center'}>
                {"Com elas voc?? da mais aten????o aos detalhes e ger??ncia tudo o que tem que ser feito para essa meta ser concluida!"}
              </Text>
            </Col>
          </Row>
        </Box>
        : renderTaskList()}
      {!goal.done
        && !task.loading
        && <Row>
          <Col>
            <Box m={0} mt={1}>
              <Button
                fullWidth
                onClick={() => { isCreateTask(true) }}
                color="primary"
                type="button"
                size="large"
              >
                {"NOVA TAREFA!"}
              </Button>
            </Box>
          </Col>
        </Row>
      }
      <ModalFooter
        open={createTask}
        change={isCreateTask}
      >
        <TaskForm onSuccess={() => isCreateTask(false)} goal={goal} />
      </ModalFooter>

      <ModalFooter
        open={editTask}
        change={isEditTask}
      >
        <TaskForm
          id={selectedTask && selectedTask.id}
          initialValues={selectedTask && {
            ...selectedTask,
            descriptionTask: selectedTask.description
          }}
          onSuccess={() => isEditTask(false)}
          goal={goal}
        />
      </ModalFooter>

      <ModalFooter
        open={dropTask}
        change={isDropTask}
      >
        <Confirmation
          confirmationTitle={"Voc?? deseja desistir da sua meta?"}
          confirmationText="Ao desistir voc?? n??o poder?? mais ver as informa????es sobre esse meta... Porque n??o tentar novamente? Voc?? tem certeza que deseja exlcui-lo?"
          confirmationButton="Excluir"
          deniedButton="Cancelar"
          confirmation={async () => { await removeTask(id, goal.id, selectedTask.id); isDropTask(false) }}
          denied={() => { isDropTask(false) }}
          target={task} />
      </ModalFooter>

      <ModalFooter
        open={taskDone}
        change={isTaskDone}
      >
        <Confirmation
          confirmationTitle={"Parab??ns! Uma meta de cada vez!"}
          confirmationText="S?? confirmar e iremos ver quanto mais f??cil ficou para que voc?? conquiste seu objetivo!"
          confirmationButton="Confirmar"
          deniedButton="Cancelar"
          confirmation={async () => {
            await doneTask({
              id: selectedTask.id,
              idGoal: goal.id,
              idObjective: id,
            })

            setSelectedTask(null)
            isTaskDone(false)
          }}
          denied={() => { isTaskDone(false) }}
          target={task} />
      </ModalFooter>
    </Fragment >
  )
}

export default withRouter(
  WithStore(
    Task,
    ['task'],
    [{
      'listTasks': list,
      'doneTask': done,
      'removeTask': remove,
      'cleanTaskAlert': cleanTaskAlert,
    }])
)