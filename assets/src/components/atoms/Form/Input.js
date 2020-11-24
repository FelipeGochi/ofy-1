import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

const InputText = (props) => (
    <TextField
        label={props.label}
        placeholder={props.label}
        error={props.meta.touched && props.meta.invalid}
        helperText={props.meta.touched && props.meta.error}
        fullWidth={props.fullWidth}
        variant="outlined"
        id={props.id}
        type={props.type || "text"}
        disabled={props.disabled}
        className={props.className}
        multiline={props.multiline}
        rows={props.rows}
        {...props.input}
        {...props.custom}
    />
)

const InputDate = (props) => {
    const {
        meta: { submitting, error, touched },
        input: { onBlur, value, ...inputProps },
        ...others
    } = props;

    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
    };

    return (
        <KeyboardDatePicker
            {...inputProps}
            {...others}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            value={value ? new Date(value) : null}
            disabled={submitting}
            onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
            error={error && touched}
            onChange={onChange}
        />
    )
}

export {
    InputDate,
    InputText
}
