import React from 'react';
import { IMAGE_PATH } from '../../../services/paths';

const Image = (props) => (
    <img
        src={`${IMAGE_PATH}/${props.name}${props.extension || '.png'}`}
        alt={props.alt}
        className={props.className}
        style={{
            height: " 250px",
            ...props.style
        }}
    />
)

export default Image

