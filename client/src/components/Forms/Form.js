import React from 'react';

const Form = ({
  formType,
  formId,
  formName,
  formPlaceholder,
  formValue,
  onChange,
  autocompleteOff,
  min,
  max,
  disabled,
  onKeyPress,
}) => {
  return (
    <>
      <input
        type={formType}
        id={formId && formId}
        name={formName}
        placeholder={formPlaceholder}
        value={formValue}
        onChange={onChange}
        autoComplete={autocompleteOff && 'off'}
        maxLength={max && max}
        minLength={min && min}
        disabled={disabled ? true : false}
      />
    </>
  );
};

export default Form;
