import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Img from '../../HtmlTags/Img';
import H3 from '../../HtmlTags/H3';
import H4 from '../../HtmlTags/H4';

const OrderSummaryItem = ({
  itemImg,
  itemAlt,
  itemTitle,
  itemQty,
  itemPrice,
  itemLink,
  itemDiscount,
}) => {
  return (
    <div className='order_summary_item'>
      <Link to={itemLink} target='_blank'>
        <div className='order_summary_item_img'>
          <Img imageSrc={itemImg} imageAlt={itemAlt} />
        </div>
      </Link>
      <div className='order_summary_item_info'>
        <H3 title={itemTitle} />
        <div>
          <H4 title={`Qty: ${itemQty}`} />
          <H4 title={`Total Price: ${itemPrice}`} />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
