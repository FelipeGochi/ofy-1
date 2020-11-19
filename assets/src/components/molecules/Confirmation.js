import { withStyles } from '@material-ui/core';
import React from 'react';
import { AlertWrapper } from '.';
import { Box, Button, Col, Container, Row, Text } from '../atoms';

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
  target
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
        </Row>
      </Container>
    </Box>
  )
})

export default Confirmation