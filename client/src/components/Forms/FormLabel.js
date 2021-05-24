import React from 'react';

const Form = ({
  formType,
  formId,
  formValue,
  formLabel,
  formGroup,
  formFirstLabel,
  onChange,
  multiple,
  disabled,
}) => {
  return (
    <div>
      <input
        type={formType}
        id={formId}
        name={formGroup}
        value={formValue}
        className={formFirstLabel ? formFirstLabel : null}
        onChange={onChange}
        multiple={multiple ? true : false}
        disabled={disabled && disabled}
      />
      <label htmlFor={formId}>{formLabel}</label>
    </div>
  );
};

export default Form;
