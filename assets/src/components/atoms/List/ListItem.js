import ListItemMaterialUI from '@material-ui/core/ListItem';
import React from 'react';
import ListItemIcon from './ListIcon';
import ListItemText from './ListText';

const ListItem = (props) => (
    <ListItemMaterialUI id={props.index}
        button onClick={() =>
            props.onClick(props.index)} selected={props.selected}>
        {props.icon !== undefined ?
            <ListItemIcon icon={props.icon} color={props.color} />
            : null}
        {props.text !== undefined ?
            <ListItemText text={props.text} color={props.color} /> : null}
    </ListItemMaterialUI>
)

export default ListItem