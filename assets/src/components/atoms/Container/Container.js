import React from 'react';
import ContainerMaterialUI from '@material-ui/core/Container';

const Container = (props) => (
    <ContainerMaterialUI
        id={props.id}
        className={props.className}
        ref={props.ref}
        component={props.component}
        disableGutters={props.disableGutters}
        maxWidth={props.maxWidth}
        fixed={props.fixed}
        onClick={props.onClick || undefined}
    >
        {props.children}
    </ContainerMaterialUI>
)

export default Container