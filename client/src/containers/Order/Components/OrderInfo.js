import React from 'react';
import { v4 as uuid } from 'uuid';

// Components
import H3 from '../../../components/HtmlTags/H3';
import H4 from '../../../components/HtmlTags/H4';

const OrderInfo = ({ orderInfoTitle, orderInfo }) => {
  return (
    <div className='order_info'>
      <H3 title={orderInfoTitle} />
      {orderInfo.map((order) => (
        <H4 title={order} key={uuid()} />
      ))}
    </div>
  );
};

export default OrderInfo;
