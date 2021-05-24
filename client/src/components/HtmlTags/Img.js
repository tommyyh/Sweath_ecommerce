import React from 'react';

const Img = ({ imageSrc, imageAlt, imageClass, onClick }) => {
  return (
    <img
      src={imageSrc}
      alt={imageAlt}
      className={imageClass}
      onClick={onClick}
    />
  );
};

export default Img;
