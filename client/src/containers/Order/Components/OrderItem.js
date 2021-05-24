import React from 'react';
import H4 from '../../../components/HtmlTags/H4';
import { Link } from 'react-router-dom';

// Components
import Img from '../../../components/HtmlTags/Img';

const OrderItem = ({
  itemImg,
  itemAlt,
  itemTitle,
  itemPrice,
  itemSlug,
  itemQuantity,
}) => {
  return (
    <div className='accountOrder_item'>
      <Link to={`/product/${itemSlug}`} target='_blank'>
        <Img imageSrc={itemImg} imageAlt={itemAlt} />
        <H4 title={`${itemTitle} (${itemQuantity})`} />
      </Link>
      <H4 title={itemPrice} />
    </div>
  );
};

export default OrderItem;
