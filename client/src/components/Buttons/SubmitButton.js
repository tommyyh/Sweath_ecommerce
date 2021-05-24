import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const Button = ({ buttonTitle, buttonClass, noArrow, onClick }) => {
  return (
    <>
      <button
        className={buttonClass}
        onClick={onClick && onClick}
        type='submit'
      >
        {buttonTitle}
        {!noArrow && <FaChevronRight />}
      </button>
    </>
  );
};

export default Button;
