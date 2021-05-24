import React from 'react';
import { Link } from 'react-router-dom';

// Components
import H4 from '../../../components/HtmlTags/H4';

const OrderLine = ({
  orderNumber,
  orderDate,
  orderAmmount,
  orderStatus,
  orderLink,
}) => {
  return (
    <div className='order_line'>
      <Link to={orderLink}>
        <H4 title={`Order: ${orderNumber}`} />
      </Link>
      <H4 title={`Date: ${orderDate}`} />
      <H4 title={`Total Ammount: ${orderAmmount}`} />
      <H4 title={`Status: ${orderStatus}`} />
    </div>
  );
};

export default OrderLine;
