import React from 'react';

const H5 = ({ title, tagClass, onClick }) => {
  return (
    <h5 className={tagClass} onClick={onClick && onClick}>
      {title}
    </h5>
  );
};

export default H5;
