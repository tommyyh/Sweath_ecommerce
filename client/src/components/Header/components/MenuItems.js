import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

// Components
import Li from '../../HtmlTags/Li';

const MenuItems = ({ path, title, setActiveMenu }) => {
  return (
    <>
      <div
        className='menu_link'
        onClick={() => (!path ? setActiveMenu(title) : '')}
      >
        {path ? (
          <Li text={<Link to={path}>{title}</Link>} />
        ) : (
          <Li text={title} />
        )}
        <FaChevronRight />
      </div>
    </>
  );
};

export default MenuItems;
