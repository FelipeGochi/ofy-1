import React from 'react';
import AppBarMaterialUI from '@material-ui/core/AppBar';

const AppBar = (props) => (
    <AppBarMaterialUI
        id={props.id}
        className={props.className}
        ref={props.ref}
        position={props.position}
        color={props.color}>
        {props.children}
    </AppBarMaterialUI>
)

export default AppBar