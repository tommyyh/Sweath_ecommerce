import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Li from '../../HtmlTags/Li';

const InnerMenuItems = ({ innerLinkTitle, activeMenu }) => {
  const innerLinkPath = innerLinkTitle.toLowerCase();

  return (
    <Li
      text={
        <>
          {activeMenu === 'Products' ? (
            <Link to={'/category/' + innerLinkPath}>{innerLinkTitle}</Link>
          ) : (
            ''
          )}
          {activeMenu === 'Sales' ? (
            <Link to={'/sale/' + innerLinkPath}>{innerLinkTitle}</Link>
          ) : (
            ''
          )}
        </>
      }
    />
  );
};

export default InnerMenuItems;
