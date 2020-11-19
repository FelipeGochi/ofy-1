import { useTheme } from "@material-ui/core";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Box, Button, Col, Container, ModalFooter, Paper, Row, Text } from "../atoms";
import { FooterCard } from "../molecules";
import { ObjectiveForm } from "../organisms";
import { convert, getToday, isEmpty } from "../../helpers/functions";
import { WithStore } from "../../store";
import { cleanObjectiveAlert, list, setObjective } from "../../store/actions/ObjectiveAction";

const Home = (props) => {
  const { user, objective, listObjective, setObjective, history, cleanObjectiveAlert } = props

  const theme = useTheme()

  const [newObjective, isNewObjective] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    listObjective()
    cleanObjectiveAlert()
  }, [])

  return (
    <Fragment>
      <Container>
        <Box mt={3} mb={3}>
          <Row>
            <Col>
              <Text variant="h3" component="h2">
                Olá, <strong>{user.firstName}</strong>!
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text variant="h4" component="h2">
                Hoje é dia <strong>
                  {getToday()}
                </strong>
              </Text>
            </Col>
          </Row>
        </Box>
        <FooterCard>
          {isEmpty(objective.list) ?
            <Box>
              <Row>
                <Col>
                  <Text align={'center'}>
                    Você não tem objetivos cadastrados
                  </Text>
                </Col>
              </Row>
            </Box>
            : objective.list.map((objective, index) => (
              <Box key={index}>
                <Paper style={{
                  background: objective.done ? theme.palette.success.light : '#424242',
                  color: !objective.done && 'white',
                  cursor: 'pointer'
                }} onClick={() => {
                  history.push(`objective/${objective.id}`)
                }}>
                  <Box pt={2} pb={2}>
                    <Container>
                      <Row>
                        <Col>
                          <Text variant="h4" component="h3">
                            <strong>
                              {objective.objective}
                            </strong>
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Text>
                            Data limite:
                            <strong>
                              {convert(new Date(objective.dateObjective.split('-')))}
                            </strong>
                          </Text>
                        </Col>
                      </Row>
                    </Container>
                  </Box>
                </Paper>
              </Box>
            ))}
          <Box>
            <Button
              fullWidth
              onClick={() => { isNewObjective(true) }}
              color="primary"
              type="button"
              startIcon="blur_circular"
              size="large"
            >
              ADICIONAR UM NOVO OBJETIVO!
            </Button>
          </Box>
        </FooterCard>
        <ModalFooter
          open={newObjective}
          change={isNewObjective}
        >
          <ObjectiveForm />
        </ModalFooter>
      </Container>
    </Fragment >
  )
}

export default withRouter(
  WithStore(Home,
    ['objective', 'user'],
    [{
      'listObjective': list,
      'setObjective': setObjective,
      'cleanObjectiveAlert': cleanObjectiveAlert
    }]
  ))