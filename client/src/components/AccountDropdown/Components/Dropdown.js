import React from 'react';

// Components
import H2 from '../../../components/HtmlTags/H2';
import Img from '../../../components/HtmlTags/Img';

// Assets
import PlusImg from '../../../assets/svg/plus.svg';
import MinusImg from '../../../assets/svg/minus.svg';

const Dropdown = ({
  dropdownClass,
  dropdownTitle,
  dropdownContent,
  dropdownOpen,
  setDropdownOpen,
}) => {
  return (
    <div className={dropdownClass}>
      <div
        className={
          !dropdownOpen
            ? dropdownClass + '_wrapper'
            : dropdownClass + `_wrapper ${dropdownClass + '_wrapper_open'}`
        }
      >
        <div className={dropdownClass + '_title'}>
          <H2 title={dropdownTitle} />
          <Img
            imageSrc={!dropdownOpen ? PlusImg : MinusImg}
            imageAlt='Plus icon'
            onClick={setDropdownOpen}
          />
        </div>
        {dropdownContent}
      </div>
    </div>
  );
};

export default Dropdown;
