import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const Button = ({ buttonTitle, buttonClass, noArrow, onClick, disabled }) => {
  return (
    <>
      <button
        className={buttonClass}
        onClick={onClick && onClick}
        disabled={disabled ? true : false}
      >
        {buttonTitle}
        {!noArrow && <FaChevronRight />}
      </button>
    </>
  );
};

export default Button;
