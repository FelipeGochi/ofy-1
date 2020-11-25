import { useTheme } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { convert, getToday, isBeforeToday, isEmpty } from "../../helpers/functions";
import { WithStore } from "../../store";
import { cleanObjectiveAlert, list, setObjective } from "../../store/actions/ObjectiveAction";
import { Avatar, Box, Button, Chip, Circular, Col, Container, Fill, Image, ModalFooter, Paper, Row, Text } from "../atoms";
import { FooterCard } from "../molecules";
import { ObjectiveForm } from "../organisms";

const Home = (props) => {
  const { user, objective, listObjective, history, cleanObjectiveAlert } = props

  const theme = useTheme()

  const [newObjective, isNewObjective] = useState(false)

  useEffect(() => {
    listObjective()
    cleanObjectiveAlert()

    document.addEventListener('scroll', handleInfinitScroll);

    return () => document.removeEventListener('scroll', handleInfinitScroll);
  }, [])

  const handleInfinitScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.scrollHeight - 50) {
      return;
    }

    listObjective()
    cleanObjectiveAlert()
  }

  const renderButton = () => !objective.loading
    && (
      <Box>
        <Row>
          <Button
            fullWidth={!isEmpty(objective.list)}
            onClick={() => { isNewObjective(true) }}
            color="primary"
            type="button"
            startIcon="blur_circular"
            size="large"
          >
            {"ADICIONAR UM NOVO OBJETIVO!"}
          </Button>
        </Row>
      </Box>
    )

  return (
    <Fragment>
      <Container>
        <Box mt={3} mb={3}>
          <Row>
            <Col
              lg={1}
              md={1}
              sm={3}
              xl={1}
              xs={3}>
              {user.loading ?
                <Fill variant={"circle"} width={"70px"} height={"70px"} /> :
                <Avatar style={{ height: "70px", width: "70px" }} alt="profile image" src={null} />
              }
            </Col>
            <Col
              lg={11}
              md={11}
              sm={9}
              xl={11}
              xs={9}>
              <Row>
                <Col>
                  <Text variant="h3" component="h2">
                    {user.loading ?
                      <Fill width={250} /> :
                      <Fragment>
                        Olá, <strong>{user.firstName}</strong>!
                      </Fragment>
                    }
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
            </Col>
          </Row>
        </Box>
        <FooterCard>
          {isEmpty(objective.list) && !objective.loading ?
            <Fragment>
              <Box>
                <Row>
                  <Col>
                    <Text variant="h4" component="h3" align={'center'}>
                      <strong>
                        {'Vamos construir seus objetivos!'}
                      </strong>
                    </Text>
                  </Col>
                </Row>
                <Box m={5}>
                  <Row>
                    <Image name={"notebook"} alt={"Objectivefy - OFY"} />
                  </Row>
                </Box>
                {renderButton()}
              </Box>
            </Fragment>
            :
            <Fragment>
              <Box mb={3}>
                <Text variant="h5" component="h3">
                  <strong>
                    {"Seus Objetivos"}
                  </strong>
                </Text>
              </Box>
              <Fragment>
                {renderButton()}
                {objective.list
                  .sort((curr, next) => curr.done - next.done)
                  .map((objective, index) => (
                    <Box key={index}>
                      <Paper style={{
                        background: objective.done ? theme.palette.success.light : theme.palette.secondary.main,
                        color: !objective.done && 'white',
                        cursor: 'pointer'
                      }} onClick={() => {
                        history.push(`objective/${objective.id}`)
                      }}>
                        <Box pt={2} pb={2}>
                          <Container>
                            {isBeforeToday(new Date(objective.dateObjective.split('-'))) &&
                              !objective.done &&
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
                                    {objective.objective}
                                  </strong>
                                </Text>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Text>
                                  {"Data limite:"}
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
                {objective.loading && <Circular />}
              </Fragment>
            </Fragment>}
        </FooterCard>

        {newObjective &&
          <ModalFooter
            open={newObjective}
            change={isNewObjective}
          >
            <ObjectiveForm />
          </ModalFooter>}

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
      'cleanObjectiveAlert': cleanObjectiveAlert,
    }]
  ))