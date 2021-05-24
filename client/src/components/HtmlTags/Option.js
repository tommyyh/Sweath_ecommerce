import React from 'react';

const Option = ({ optionValue, optionName }) => {
  return <option value={optionValue}>{optionName}</option>;
};

export default Option;
