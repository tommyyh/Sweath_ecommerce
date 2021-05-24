import React from 'react';

// Assets
import PlusImg from '../../../assets/svg/plus.svg';
import MinusImg from '../../../assets/svg/minus.svg';

// Components
import H3 from '../../../components/HtmlTags/H3';
import Img from '../../../components/HtmlTags/Img';

const SaleSortOption = ({
  sortOptionTitle,
  sortOption1,
  sortOption2,
  sortOption3,
  sortOption4,
  sortOptionName1,
  sortOptionName2,
  sortOptionName3,
  sortOptionName4,
  checkbox,
  formGroup,
  setOpen,
  filterState,
  disabled1,
}) => {
  return (
    <>
      <span>
        <H3 title={sortOptionTitle} />
        <Img
          imageSrc={filterState ? MinusImg : PlusImg}
          imageAlt='Plus icon'
          onClick={setOpen}
        />
      </span>
      {sortOption1 && (
        <div>
          <input
            type={checkbox ? 'checkbox' : 'radio'}
            id={sortOptionName1}
            name={checkbox ? sortOptionName1 : formGroup}
            value={sortOptionName1}
            className={sortOptionName1 && sortOptionName1}
            defaultChecked={!checkbox && true}
            disabled={disabled1 && true}
          />
          <label htmlFor={sortOptionName1}>{sortOption1}</label>
        </div>
      )}
      {sortOption2 && (
        <div>
          <input
            type={checkbox ? 'checkbox' : 'radio'}
            id={sortOptionName2}
            name={checkbox ? sortOptionName2 : formGroup}
            value={sortOptionName2}
          />
          <label htmlFor={sortOptionName2}>{sortOption2}</label>{' '}
        </div>
      )}
      {sortOption3 && (
        <div>
          <input
            type={checkbox ? 'checkbox' : 'radio'}
            id={sortOptionName3}
            name={checkbox ? sortOptionName3 : formGroup}
            value={sortOptionName3}
          />
          <label htmlFor={sortOptionName3}>{sortOption3}</label>
        </div>
      )}
      {sortOption4 && (
        <div>
          <input
            type={checkbox ? 'checkbox' : 'radio'}
            id={sortOptionName4}
            name={checkbox ? sortOptionName4 : formGroup}
            value={sortOptionName4}
          />
          <label htmlFor={sortOptionName4}>{sortOption4}</label>
        </div>
      )}
    </>
  );
};

export default SaleSortOption;
