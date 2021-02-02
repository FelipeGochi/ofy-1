import React from 'react';
import { STATIC_PATH, IMAGE_PATH } from '../../../services/paths';

const Image = (props) => (
    <img
        src={`${STATIC_PATH}${IMAGE_PATH}/${props.name}${props.extension || '.png'}`}
        alt={props.alt}
        className={props.className}
        style={{
            height: " 250px",
            ...props.style
        }}
    />
)

export default Image

