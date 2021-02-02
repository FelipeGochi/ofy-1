import { makeStyles, useTheme } from "@material-ui/core";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { convert, isBeforeToday, isEmpty, isEquals, isNull } from "../../helpers/functions";
import { WithStore } from "../../store";
import { cleanGoalAlert, done, list, remove } from "../../store/actions/GoalAction";
import { Box, Button, Chip, Circular, Col, Container, FloatButton, Icon, ModalFooter, Paper, Row, Text } from "../atoms";
import { Confirmation } from "../molecules";
import { GoalForm } from "../organisms";
import Task from "./Task";

const useStyles = makeStyles((theme) => ({
  successButton: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    '&:hover': {
      backgroundColor: theme.palette.success.light
    },
  }
}));

const Goal = (props) => {
  const {
    objective,
    goal,
    listGoals,
    removeGoal,
    doneGoal,
    match,
    cleanGoalAlert
  } = props

  const classes = useStyles()

  const { id } = match.params

  const [createGoal, isCreateGoal] = useState(false)
  const [editGoal, isEditGoal] = useState(false)
  const [dropGoal, isDropGoal] = useState(false)
  const [goalDone, isGoalDone] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)

  const theme = useTheme()

  const handleGoal = useCallback(() => {
    cleanGoalAlert()
    listGoals(id)
  }, [
    id,
    cleanGoalAlert,
    listGoals
  ])

  const handleInfinitScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.scrollHeight - 50) {
      return;
    }

    handleGoal()
  }, [handleGoal])

  useEffect(() => {
    handleGoal()
    document.addEventListener('scroll', handleInfinitScroll);

    return () => document.removeEventListener('scroll', handleInfinitScroll);
  }, [
    handleGoal,
    handleInfinitScroll,
  ])

  const renderButton = () =>
    !goal.loading
    && objective.current
    && !objective.current.done
    && (
      <Box>
        <Button
          fullWidth
          onClick={() => { isCreateGoal(true) }}
          color="primary"
          type="button"
          startIcon="blur_circular"
          size="large"
        >
          {"ADICIONAR UMA NOVA META!"}
        </Button>
      </Box >
    )

  return (
    <Fragment>
      {isEmpty(goal.list) && !goal.loading ?
        <Box>
          <Row>
            <Col>
              <Text align={'center'}>
                <strong>
                  {"VOCÊ TEM UM OBJETIVO!"}
                </strong>
              </Text>
              <Text align={'center'}>
                {"Mas para que você conquiste ele rápido, nós do OFY acreditamos que você deve ter:"}
              </Text>
              <Text align={"center"} variant={"h3"} component={"h1"}>
                <strong>{"METAS"}</strong>
              </Text>
              <Text align={'center'}>
                {'As metas servem para que você quebre esse grande objetivo em pequenas partes, vamos "dividir pra conquistar!"'}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              {renderButton()}
            </Col>
          </Row>
        </Box>
        :
        <Fragment>
          <Box mb={3}>
            <Text variant="h5" component="h3">
              <strong>
                {"Suas Metas"}
              </strong>
            </Text>
          </Box>
          {renderButton()}
          {goal.list
            .sort((curr, next) => curr.done - next.done)
            .map((goal, index) => (
              <Box key={index}>
                <Paper style={{
                  background: goal.done ? theme.palette.success.light : theme.palette.secondary.main,
                  color: !goal.done && 'white',
                  cursor: 'pointer'
                }}>
                  <Box pt={2} pb={2}>
                    <Container onClick={() => {
                      isEquals(goal, selectedGoal) ?
                        setSelectedGoal(null) : setSelectedGoal(goal)
                    }}>
                      {isBeforeToday(new Date(goal.dateGoal.split('-'))) &&
                        !goal.done &&
                        <Row>
                          <Col>
                            <Chip
                              label={'ATRASADO'}
                              color={'primary'}
                              size={"small"} />
                          </Col>
                        </Row>}
                      <Row>
                        <Col>
                          <Text variant="h4" component="h3">
                            <strong>
                              {goal.goal}
                            </strong>
                          </Text>
                        </Col>
                        <Col>
                          <Text>
                            {"Data limite:"}
                            <strong>
                              {convert(new Date(goal.dateGoal.split('-')))}
                            </strong>
                          </Text>
                        </Col>
                      </Row>
                    </Container>
                    {isEquals(goal, selectedGoal) &&
                      !goalDone && !createGoal && !editGoal && !dropGoal &&
                      <Container>
                        <Row>
                          <Col>
                            <Box ml={0} mr={0} mt={1} mb={1}>
                              <Text variant='h6'>
                                <strong>
                                  {"Anotações: "}
                                </strong>
                                {goal.description ? goal.description : '-'}
                              </Text>
                            </Box>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Task goal={goal} />
                          </Col>
                        </Row>
                      </Container>}
                    {!goal.done &&
                      <Container>
                        <Row>
                          <Col>
                            <div style={{
                              display: 'flex',
                              justifyContent: "flex-start",
                              alignItems: "center"
                            }}>
                              <Box ml={0}>
                                <Button
                                  fullWidth
                                  color="secondary"
                                  type="button"
                                  className={classes.successButton}
                                  onClick={() => { isGoalDone(true); setSelectedGoal(goal) }}
                                >
                                  {"CONCLUIR!"}
                                </Button>
                              </Box>
                              <Box>
                                <FloatButton
                                  size="small"
                                  color="primary"
                                  aria-label="edit"
                                  onClick={() => { isEditGoal(true); setSelectedGoal(goal) }}>
                                  <Icon>create</Icon>
                                </FloatButton>
                              </Box>
                              <Box>
                                <FloatButton
                                  size="small"
                                  color="secondary"
                                  aria-label="delete"
                                  onClick={() => { isDropGoal(true); setSelectedGoal(goal) }}>
                                  <Icon>delete</Icon>
                                </FloatButton>
                              </Box>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    }
                  </Box>
                </Paper>
              </Box>))}
          {goal.loading && <Circular />}
        </Fragment>}

      <ModalFooter
        open={createGoal}
        change={isCreateGoal}
      >
        <GoalForm onSuccess={() => isCreateGoal(false)} />
      </ModalFooter>

      <ModalFooter
        open={editGoal}
        change={isEditGoal}
      >
        <GoalForm
          id={selectedGoal && selectedGoal.id}
          initialValues={selectedGoal && {
            ...selectedGoal,
            dateGoal: new Date(selectedGoal.dateGoal.split('-'))
          }}
          onSuccess={() => isEditGoal(false)}
        />
      </ModalFooter>

      <ModalFooter
        open={dropGoal}
        change={isDropGoal}
      >
        <Confirmation
          confirmationTitle={"Você deseja desistir da sua meta?"}
          confirmationText="Ao desistir você não poderá mais ver as informações sobre essa meta... Porque não tentar novamente? Você tem certeza que deseja exlcuí-lá?"
          confirmationButton="Excluir"
          deniedButton="Cancelar"
          confirmation={async () => {
            if (isNull(goal.error)) {
              const goalRemoved = await removeGoal(id, selectedGoal.id);

              if (goalRemoved) {
                isDropGoal(false)
              }
            }
          }}
          denied={() => { isDropGoal(false) }}
          target={goal} />
      </ModalFooter>

      <ModalFooter
        open={goalDone}
        change={isGoalDone}
      >
        <Confirmation
          confirmationTitle={"Parabéns! Uma meta de cada vez!"}
          confirmationText="Só confirmar e iremos ver quanto mais fácil ficou para que você conquiste seu objetivo!"
          confirmationButton="Confirmar"
          deniedButton="Cancelar"
          confirmation={async () => {
            if (isNull(goal.error)) {
              const goalDone = await doneGoal({
                id: selectedGoal.id,
                idObjective: id,
              })

              if (goalDone) {
                setSelectedGoal(null)
                isGoalDone(false)
              }
            }
          }}
          denied={() => { cleanGoalAlert(); isGoalDone(false) }}
          target={goal} />
      </ModalFooter>
    </Fragment >
  )
}

export default withRouter(
  WithStore(
    Goal,
    ['goal', 'objective'],
    [{
      'listGoals': list,
      'doneGoal': done,
      'removeGoal': remove,
      'cleanGoalAlert': cleanGoalAlert,
    }])
)