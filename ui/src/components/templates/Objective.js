import { useTheme } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { convert, daysFromToday, isNull } from "../../helpers/functions";
import { WithStore } from "../../store";
import { list } from "../../store/actions/GoalAction";
import { cleanObjectiveAlert, done, getObjective, remove } from "../../store/actions/ObjectiveAction";
import { Box, Button, Col, Container, Fill, FloatButton, Icon, ModalFooter, Paper, Row, Text } from "../atoms";
import { Confirmation, FooterCard } from "../molecules";
import { ObjectiveForm } from "../organisms";
import Goal from "./Goal";

const Objective = (props) => {
  const {
    objective,
    match,
    history,
    getObjective,
    removeObjective,
    doneObjective,
    cleanObjectiveAlert,
  } = props

  const theme = useTheme()

  const { id } = match.params

  const [editObjective, isEditObjective] = useState(false)
  const [dropObjective, isDropObjective] = useState(false)
  const [objectiveDone, isDoneObjective] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    getObjective(id)

    cleanObjectiveAlert()
  }, [editObjective,
    dropObjective,
    objectiveDone,
    id,
    cleanObjectiveAlert,
    getObjective])

  const { current } = objective

  if (!current) return null;

  const renderDaysCount = () => {
    const objectiveDate = new Date(current.dateObjective.split('-'))
    const today = new Date()

    const daysCount = () => {
      if (objectiveDate > today) {
        return {
          text: "Você vai completar",
          date: daysFromToday(objectiveDate)
        }
      } else {
        return {
          text: "Você está atrasado",
          date: daysFromToday(objectiveDate)
        }
      }
    }

    const labels = daysCount()

    return (
      <Fragment>
        <Text variant="subtitle1">
          {labels.text}
        </Text>
        <Text variant="h4" component="h2">
          {objective.loading ?
            <Fill width={"250px"} /> :
            <strong>
              {labels.date}
            </strong>}
        </Text>
      </Fragment>
    )
  }

  const renderDone = () => {
    if (current.done)
      return (
        <Row>
          <Col>
            <Paper>
              <Box p={2}>
                {/* TODO (FG): Criar um componente de texto com data */}
                <Text variant="subtitle1">
                  {"Você concluiu ele dia"}
                </Text>
                <Text variant="h4" component="h2">
                  {objective.loading ?
                    <Fill width={"250px"} /> :
                    <strong>
                      {convert(new Date(current.updated))}
                    </strong>
                  }
                </Text>
              </Box>
            </Paper>
          </Col>
        </Row>)

    return (
      <Row>
        <Col lg={6} sm={12}>
          <Paper>
            <Box p={2}>
              {/* TODO (FG): Criar um componente de texto com data */}
              <Text variant="subtitle1">
                {"Você quer conclui-ló até dia"}
              </Text>
              <Text variant="h4" component="h2">
                {objective.loading ?
                  <Fill width={"250px"} /> :
                  <strong>
                    {convert(new Date(current.dateObjective.split('-')))}
                  </strong>}
              </Text>
            </Box>
          </Paper>
        </Col>
        <Col lg={6} sm={12}>
          <Paper>
            <Box p={2}>
              {renderDaysCount()}
            </Box>
          </Paper>
        </Col>
        <Col>
          <Button
            fullWidth
            type="button"
            size="large"
            style={{
              backgroundColor: theme.palette.success.main,
              color: "white",
              '&:hover': {
                backgroundColor: theme.palette.success.light
              }
            }}
            onClick={() => { isDoneObjective(true); }}
          >
            {"CONCLUIR OBJETIVO!"}
          </Button>
        </Col>
      </Row>)
  }

  return (
    <Fragment>
      <Container>
        <Box mt={3} mb={3}>
          <Row>
            <Col>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
                <Box>
                  <FloatButton
                    size="small"
                    color="primary"
                    aria-label="home"
                    onClick={() => history.push('/')}>
                    <Icon>arrow_back</Icon>
                  </FloatButton>
                </Box>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
                <div>
                  <Text variant="subtitle1">
                    {"Seu Objetivo é"}
                  </Text>
                  <Text variant="h2" component="h2">
                    {objective.loading ?
                      <Fill width={"250px"} /> :
                      <strong>
                        {current.objective}
                      </strong>
                    }
                  </Text>
                </div>
                {current && !current.done &&
                  <Fragment>
                    <Box>
                      <FloatButton
                        size="small"
                        color="primary"
                        aria-label="edit"
                        onClick={() => isEditObjective(true)}>
                        <Icon>create</Icon>
                      </FloatButton>
                    </Box>
                    <Box>
                      <FloatButton
                        size="small"
                        color="secondary"
                        aria-label="delete"
                        onClick={() => isDropObjective(true)}>
                        <Icon>delete</Icon>
                      </FloatButton>
                    </Box>
                  </Fragment>}
              </div>
            </Col>
          </Row>
          {renderDone()}
        </Box>
        <FooterCard>
          <Goal />
        </FooterCard>
      </Container >

      <ModalFooter
        open={editObjective}
        change={isEditObjective}
      >
        <ObjectiveForm id={id}
          initialValues={{
            ...current,
            dateObjective: new Date(current.dateObjective.split('-'))
          }}
          onSuccess={() => isEditObjective(false)}
        />
      </ModalFooter>

      <ModalFooter
        open={dropObjective}
        change={isDropObjective}
      >
        <Confirmation
          confirmationTitle={"Você deseja desistir do seu objetivo?"}
          confirmationText="Ao desistir você não poderá mais ver as informações sobre esse objetivo... Porque não tentar novamente? Você tem certeza que deseja exlcui-lo?"
          confirmationButton="Excluir"
          deniedButton="Cancelar"
          confirmation={async () => {
            if (isNull(objective.error)) {
              const objectiveRemoved = await removeObjective(id);

              if (objectiveRemoved) {
                history.push('/')
              }
            }
          }}
          denied={() => { isDropObjective(false) }}
          target={objective} />
      </ModalFooter>

      <ModalFooter
        open={objectiveDone}
        change={isDoneObjective}
      >
        <Confirmation
          confirmationTitle={"Parabéns! você concluiu seu OBJETIVO!"}
          confirmationText="Ficamos feliz que você concluiu seu objetivo, conclua e continue conquistando seus objetivos!"
          confirmationButton="Confirmar"
          deniedButton="Cancelar"
          confirmation={async () => {
            if (isNull(objective.error)) {
              const objectiveDone = await doneObjective({
                id: id,
              })

              if (objectiveDone) {
                isDoneObjective(false)
              }
            }
          }}
          denied={() => { cleanObjectiveAlert(); isDoneObjective(false) }}
          target={objective} />
      </ModalFooter>
    </Fragment >
  )
}

export default withRouter(
  WithStore(
    Objective,
    ['objective', 'goal'],
    [{
      'getObjective': getObjective,
      'removeObjective': remove,
      'listGoals': list,
      'doneObjective': done,
      'cleanObjectiveAlert': cleanObjectiveAlert
    }])
)