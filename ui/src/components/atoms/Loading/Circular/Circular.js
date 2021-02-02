import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { Box, Container, Row } from '../..';

const Circular = (props) => (
    <Box p={1}>
        <Container>
            <Row>
                <CircularProgress
                    color={props.color}
                    disableShrink={props.disableShrink}
                    size={props.size || 75}
                    thickness={props.thickness}
                    value={props.value}
                    variant={props.variant}
                />
            </Row>
        </Container>
    </Box>
)

export default Circular