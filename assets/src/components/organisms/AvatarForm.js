import { makeStyles } from "@material-ui/core";
import React, { Fragment, useRef, useState } from "react";
import { reduxForm } from 'redux-form';
import { Avatar, Badge, Box, Button, Col, Form, IconButton, Paper, Text } from "../atoms";
import { useHistory } from "react-router-dom";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStylesForm = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        width: '100%',
    },
    large: {
        width: '175px',
        height: '175px',
    }
}))

const validate = values => {
    const errors = {};

    if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.username))
        errors.username = 'Entre com um email válido!';

    if (values.password && values.password.length < 6)
        errors.password = 'A senha deve ter mais de 6 digítos';

    const requiredFields = [
        'username',
        'password',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Esse campo é obrigatório'
        }
    })

    return errors;
};

const AvatarForm = (props) => {
    let history = useHistory();

    const inputFotoRef = useRef(null);

    const [profilePic, setProfilePic] = useState(null)

    const classes = useStylesForm();

    const { handleSubmit, submitting, error, user } = props;

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)} className={classes.root} >
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={
                    <Fragment>
                        <input
                            accept="image/*"
                            hidden
                            id="icon-button-file"
                            type="file"
                            onChange={(event) => {
                                setProfilePic(URL.createObjectURL(inputFotoRef.current.files[0]))

                                return event
                            }}
                            ref={inputFotoRef} />
                        <label htmlFor="icon-button-file">
                            <IconButton
                                edge="start"
                                color="primary"
                                aria-label="add-foto"
                                onClick={() => {
                                    inputFotoRef.current.click();
                                }}
                            >
                                <AddAPhotoIcon />
                            </IconButton>
                        </label>
                    </Fragment>
                }>
                <label htmlFor="icon-button-file">
                    <Avatar alt="profile image" src={profilePic} className={classes.large} />
                </label>
            </Badge>
        </Form >
    )
}

export default reduxForm({
    form: 'avatar-form',
    validate
})(AvatarForm)
