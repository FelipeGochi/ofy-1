import React, { forwardRef } from 'react';
import PaperMaterialUI from '@material-ui/core/Paper';

const Paper = (props) => (
    <PaperMaterialUI
        id={props.id}
        className={props.className}
        ref={props.forwardedRef}
        component={props.component}
        elevation={props.elevation}
        square={props.square}
        variant={props.square}
        style={props.style}
        onClick={props.onClick || null}
    >
        {props.children}
    </PaperMaterialUI>
)

export default forwardRef((props, ref) => <Paper {...props} forwardedRef={ref} />); 