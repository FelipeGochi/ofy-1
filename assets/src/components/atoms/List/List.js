import ListMaterialUI from '@material-ui/core/List';
import React from 'react';
import ListItem from './ListItem';

const List = (props) => (
    <ListMaterialUI>
        {props.list.map((it, index) =>
            <ListItem {...it} key={index} selected={props.page === it.index} />)}
    </ListMaterialUI>
)

export default List