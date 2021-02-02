import React from 'react';
import BadgeMaterialUI from '@material-ui/core/Badge';

const Badge = (props) => (
    <BadgeMaterialUI
        id={props.id}
        className={props.className}
        ref={props.ref}
        position={props.position}
        color={props.color}
        badgeContent={props.badgeContent}
        overlap={props.overlap}
        anchorOrigin={props.anchorOrigin}>
        {props.children}
    </BadgeMaterialUI>
)

export default Badge