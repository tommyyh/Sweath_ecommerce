import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

// Styles
import './orders.scss';

// Components
import Loading from '../../components/Loading/Loading';
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';
import P from '../../components/HtmlTags/P';
import OrderLine from './Components/OrderLine';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Loading
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    setLoading(true);

    const fetchOrders = async () => {
      const res = await axios.get('/user/orders');

      setOrders(res.data.orders);
    };

    fetchOrders();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: My Account - Order history</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <div className='order_history_wrapper'>
        <AccountDropdown dropdownClass='account_orders_dropdown' />
        <main className='order_history'>
          <h1>Order History</h1>
          <span
            className={
              !orders[0] ? 'order_history_span_missing' : 'order_history_span'
            }
          >
            {!orders[0] ? (
              <P
                text="You don't have any orders yet. After a purchase, your orders will be shown here."
                tagClass='no_orders'
              />
            ) : (
              <>
                {orders.map((order) => (
                  <OrderLine
                    orderNumber={order.id}
                    orderDate={`${order.createdAt.split(' ')[0]}`}
                    orderAmmount={`$${order.totalAmmount}`}
                    orderStatus={order.status === 5 && 'Pending'}
                    orderLink={`/my-account/order/${order.id}`}
                    key={order.id}
                  />
                ))}
              </>
            )}
          </span>
        </main>
      </div>
    </>
  );
};

export default Orders;
