import React from 'react';

const Li = ({ text, tagClass, onClick }) => {
  return (
    <li className={tagClass} onClick={onClick}>
      {text}
    </li>
  );
};

export default Li;
