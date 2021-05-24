import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import InnerMenuItems from './InnerMenuItems';
import H2 from '../../HtmlTags/H2';
import H3 from '../../HtmlTags/H3';
import Ul from '../../HtmlTags/Ul';

const InnerMenu = ({
  activeMenuClass,
  activeMenu,
  title,
  closeInnerMenu,
  innerLinkTitle1,
  innerLinkTitle2,
  innerLinkTitle3,
  innerLinkTitle4,
}) => {
  return (
    <>
      <div className={activeMenuClass}>
        <div className='go_back' onClick={() => closeInnerMenu('')}>
          <FaChevronLeft />
          <H3 title='All' />
        </div>
        <H2 title={title} />
        <Ul
          listChildren={
            <>
              <InnerMenuItems
                innerLinkTitle={innerLinkTitle1}
                activeMenu={activeMenu}
              />
              <InnerMenuItems
                innerLinkTitle={innerLinkTitle2}
                activeMenu={activeMenu}
              />
              <InnerMenuItems
                innerLinkTitle={innerLinkTitle3}
                activeMenu={activeMenu}
              />
              <InnerMenuItems
                innerLinkTitle={innerLinkTitle4}
                activeMenu={activeMenu}
              />
            </>
          }
        />
      </div>
    </>
  );
};

export default InnerMenu;
