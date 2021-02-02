import React from "react";
import AvatarMaterialUi from '@material-ui/core/Avatar';

const Avatar = (props) => (
  <AvatarMaterialUi
    id={props.id}
    className={props.className}
    ref={props.ref}
    imgProps={props.imgProps}
    sizes={props.sizes}
    src={props.src}
    srcSet={props.srcSet}
    variant={props.variant}
    heigth={props.heigth}
    width={props.width}
    style={props.style}
  >
    {props.children}
  </AvatarMaterialUi>
)

export default Avatar