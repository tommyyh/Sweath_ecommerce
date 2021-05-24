import React from 'react';

// Styles
import './orderProgress.scss';

// Components
import OrderProgressBar from './Components/OrderProgressBar';

const OrderProgress = ({
  current1,
  current2,
  current3,
  current4,
  disabled3,
  disabled4,
}) => {
  return (
    <div className='order_progress'>
      <OrderProgressBar
        barNumber='1'
        barTitle='Shopping cart'
        currentBar={!current1 ? false : true}
      />
      <OrderProgressBar
        barNumber='2'
        barTitle='Shipping Info'
        currentBar={!current2 ? false : true}
      />
      <OrderProgressBar
        barNumber='3'
        barTitle='Payment'
        currentBar={!current3 ? false : true}
        disabledBar={!disabled3 ? false : true}
      />
      <OrderProgressBar
        barNumber='4'
        barTitle='Order Complete'
        currentBar={!current4 ? false : true}
        disabledBar={!disabled4 ? false : true}
      />
    </div>
  );
};

export default OrderProgress;
