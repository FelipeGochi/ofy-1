import IconMaterialUI from '@material-ui/core/Icon';
import React from 'react';

const Icon = (props) => (
    <IconMaterialUI style={{ color: props.color }}>
        {props.children}
    </IconMaterialUI>
)

export default Icon

