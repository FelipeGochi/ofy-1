import React from 'react';
import ToolbarMaterialUI from '@material-ui/core/Toolbar';

const Toolbar = (props) => (
    <ToolbarMaterialUI
        id={props.id}
        className={props.classeName}
        ref={props.ref}
        component={props.component}
        disableGutters={props.disableGutters}
        variant={props.variant}
    >
        {props.children}
    </ToolbarMaterialUI>
)

export default Toolbar