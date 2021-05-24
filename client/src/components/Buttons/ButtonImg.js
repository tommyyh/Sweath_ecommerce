import React from 'react';

const ButtonImg = ({
  buttonTitle,
  buttonClass,
  buttonImg,
  buttonImgLeft,
  onClick,
}) => {
  return (
    <>
      <button className={!buttonClass ? buttonClass : null} onClick={onClick}>
        {buttonImgLeft ? buttonImg : null}
        {buttonTitle}
        {!buttonImgLeft ? buttonImg : null}
      </button>
    </>
  );
};

export default ButtonImg;
