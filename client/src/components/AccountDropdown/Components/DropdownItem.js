import React from 'react';
import { Link } from 'react-router-dom';

import Img from '../../../components/HtmlTags/Img';
import H3 from '../../../components/HtmlTags/H3';
import H4 from '../../../components/HtmlTags/H4';

const DropdownItem = ({
  itemImg,
  itemTitle,
  itemGroup,
  itemPrice,
  itemAvailable,
  itemLink,
}) => {
  return (
    <div className={`account_${itemGroup}_item`}>
      <Link to={`/product/${itemLink}`} className={`account_${itemGroup}_img`}>
        <Img
          imageSrc={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${itemImg}`}
          imageAlt={itemTitle}
        />
      </Link>
      <div className={`account_${itemGroup}_info`}>
        <H3 title={itemTitle} />
        <div>
          <H4 title={itemAvailable} />
          <H4 title={itemPrice} />
        </div>
      </div>
    </div>
  );
};

export default DropdownItem;
