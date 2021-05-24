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
            <Link to={'/products/' + innerLinkPath}>{innerLinkTitle}</Link>
          ) : (
            ''
          )}
          {activeMenu === 'Accessories' ? (
            <Link to={'/accessories/' + innerLinkPath}>{innerLinkTitle}</Link>
          ) : (
            ''
          )}
          {activeMenu === 'Sale' ? (
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
