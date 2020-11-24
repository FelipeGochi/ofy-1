import { withStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import { AlertWrapper } from '.';
import { Box, Button, Circular, Col, Container, Row, Text } from '../atoms';

const Confirmation = withStyles((theme) => ({
  root: {}
}))(({
  classes,
  confirmationTitle,
  confirmationText,
  confirmation,
  confirmationButton,
  denied,
  deniedButton,
  target,
  loading
}) => {
  return (
    <Box p={1}>
      <AlertWrapper data={target} />
      <Container>
        <Row>
          <Col>
            <Box>
              <Text align={"center"} variant={"h3"} component={"h1"}>
                {confirmationTitle}
              </Text>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col>
            <Box>
              <Text align={"center"} >
                {confirmationText}
              </Text>
            </Box>
          </Col>
        </Row>
        <Row>
          {target.loading ?
            <Circular size={50} /> :
            <Fragment>
              <Col lg={6} md={6}>
                <Box>
                  <Button
                    fullWidth
                    disabled={target.loading}
                    onClick={confirmation}
                    color="primary"
                    size="large"
                  >
                    {confirmationButton}
                  </Button>
                </Box>
              </Col>
              <Col lg={6} md={6}>
                <Box>
                  <Button
                    fullWidth
                    onClick={denied}
                    color="secondary"
                    size="large"
                  >
                    {deniedButton}
                  </Button>
                </Box>
              </Col>
            </Fragment>}
        </Row>
      </Container>
    </Box>
  )
})

export default Confirmation