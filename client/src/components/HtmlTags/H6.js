import React from 'react';

const H6 = ({ title, tagClass, onClick }) => {
  return (
    <h6 className={tagClass} onClick={onClick && onClick}>
      {title}
    </h6>
  );
};

export default H6;
