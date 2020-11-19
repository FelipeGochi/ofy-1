import React from "react";
import {
    AccordionDetails as AccordionDetailsMaterialUI,
    Accordion as AccordionMaterialUI,
    AccordionSummary as AccordionSummaryMaterialUI
} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Text } from "../atoms";

const Accordion = (props) => (
    <AccordionMaterialUI>
        <AccordionSummaryMaterialUI
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${props.id}-content`}
            id={`${props.id}-header`}
            style={props.styleHeader}>
            <Text>
                <strong>
                    {props.title}
                </strong>
            </Text>
        </AccordionSummaryMaterialUI>
        <AccordionDetailsMaterialUI style={{ width: '100%' }}>
            {props.children}
        </AccordionDetailsMaterialUI>
    </AccordionMaterialUI>
)

export default Accordion