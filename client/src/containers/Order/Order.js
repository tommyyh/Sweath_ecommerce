import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

// Styles
import './order.scss';

// Components
import Loading from '../../components/Loading/Loading';
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';
import H2 from '../../components/HtmlTags/H2';
import H4 from '../../components/HtmlTags/H4';
import H3 from '../../components/HtmlTags/H3';
import OrderItem from './Components/OrderItem';
import OrderInfo from './Components/OrderInfo';
import NotFound from '../NotFound/NotFound';

const Finish = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Loading
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    setLoading(true);

    const fetchOrder = async () => {
      const res = await axios.get(`/user/order/${id}`);

      setOrder(res.data.order);
      setLoading(false);
    };

    fetchOrder(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {!order ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            {/* Head */}
            <Helmet>
              <title>Sweath: My account - Orders</title>
            </Helmet>
          </HelmetProvider>
          {/* Body */}
          <div className='accountOrder_wrapper'>
            <AccountDropdown dropdownClass='account_order_dropdown' />
            <main>
              <div className='accountOrder'>
                <H2 title='YOUR ORDERS' />
                <h1>ORDER: {order.id}</h1>
                <div className='accountOrder_overview'>
                  <H4 title={`Ordered At: ${order.createdAt.split(' ')[0]}`} />
                  <H4 title={`Status: ${order.status === 5 && 'Pending'}`} />
                </div>
                <div className='accountOrder_items'>
                  <H3 title='Items' />
                  {order.OrderItems.map((orderItem) => (
                    <OrderItem
                      itemImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${orderItem.image1}`}
                      itemAlt={orderItem.title}
                      itemTitle={orderItem.title}
                      itemPrice={`$${orderItem.totalPrice}`}
                      itemSlug={orderItem.slug}
                      itemQuantity={orderItem.quantity}
                      key={orderItem.id}
                    />
                  ))}
                </div>
                <div className='accountOrder_info'>
                  <OrderInfo
                    orderInfoTitle='Order Overview'
                    orderInfo={[
                      `Payment Method: ${order.paymentMethod}`,
                      `Transport Method: ${order.transportMethod}`,
                      `Total Ammount: $${order.totalAmmount}`,
                    ]}
                  />
                  <OrderInfo
                    orderInfoTitle='Shipping Information'
                    orderInfo={[
                      `Address Line 1: ${order.addressLine1}`,
                      `Address Line 2: ${order.addressLine2}`,
                      `State: ${order.state}`,
                      `City: ${order.city}`,
                      `Zip Code: ${order.zipCode}`,
                    ]}
                  />
                  <OrderInfo
                    orderInfoTitle='Billing information'
                    orderInfo={[
                      `Full Name: ${order.fullName}`,
                      `Phone number: ${order.phone}`,
                      `Email: ${order.email}`,
                      `Company Name: ${order.companyName}`,
                    ]}
                  />
                </div>
                <div className='accountOrder_goBack'>
                  <FaChevronLeft fill='#4870ff' size={14} />
                  <Link to='/my-account/orders'>Go Back</Link>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Finish;
