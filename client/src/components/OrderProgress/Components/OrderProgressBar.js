import React from 'react';

// Components
import H4 from '../../HtmlTags/H4';
import H3 from '../../HtmlTags/H3';

const OrderProgressBar = ({ barNumber, barTitle, currentBar, disabledBar }) => {
  return (
    <div
      className={
        !disabledBar
          ? 'order_progress_bar'
          : 'order_progress_bar order_progress_bar_disabled'
      }
    >
      <div className='order_progress_number'>
        <H4 title={barNumber} />
      </div>
      <H3
        title={barTitle}
        tagClass={
          currentBar
            ? 'order_progress_title order_progress_title_current'
            : 'order_progress_title'
        }
      />
    </div>
  );
};

export default OrderProgressBar;
