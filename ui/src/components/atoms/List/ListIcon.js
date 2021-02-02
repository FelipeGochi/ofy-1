import ListItemIconMaterialUI from '@material-ui/core/ListItemIcon';
import React from 'react';
import { Icon } from '..';

const ListItemIcon = (props) => (
    <ListItemIconMaterialUI>
        <Icon color={props.color}>
            {props.icon}
        </Icon>
    </ListItemIconMaterialUI>
)

export default ListItemIcon

