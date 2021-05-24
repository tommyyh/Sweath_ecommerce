import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Img from '../../HtmlTags/Img';

const NavIcons = ({
  linkIcon,
  linkIconAlt,
  iconClass,
  setSearchOpen,
  searchOpen,
  iconLinkPath,
}) => {
  return (
    <>
      {!iconLinkPath ? (
        <Img
          imageSrc={linkIcon}
          imageAlt={linkIconAlt}
          imageClass={iconClass}
          onClick={() => setSearchOpen(!searchOpen)}
        />
      ) : (
        <Link to={iconLinkPath}>
          <Img
            imageSrc={linkIcon}
            imageAlt={linkIconAlt}
            imageClass={iconClass}
          />
        </Link>
      )}
    </>
  );
};

export default NavIcons;
