import React from "react";

function InputValidation({ onChange, type, value, name, id, placeholder, minLength, maxLength, required }) {
const[errorMessage, setErrorMessage] = React.useState('');

function handleChange(e) {
  onChange(e.target.value);
  setErrorMessage(e.target.validationMessage);
}

return (
  <>
    <input className={`form__element form__element_type_${name}`} onChange={handleChange} type={type} value={value} name={name} id={id} placeholder={placeholder} minLength={minLength} maxLength={maxLength} required={required} />
    <span className={`form-error ${name}-form-error`} id={`${name}-form-error`}>{errorMessage}</span>
  </>
)

}

export default InputValidation;