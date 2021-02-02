import ListItemTextMaterialUI from '@material-ui/core/ListItemText';
import React from 'react';

const ListItemText = (props) => (
    <ListItemTextMaterialUI style={{color: props.color}}>{props.text}</ListItemTextMaterialUI>
)

export default ListItemText

