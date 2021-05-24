import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Styles
import './payment.scss';

// Components
import Loading from '../../components/Loading/Loading';
import OrderProgress from '../../components/OrderProgress/OrderProgress';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import PaymentForm from './Components/PaymentForm';
import H2 from '../../components/HtmlTags/H2';
import P from '../../components/HtmlTags/P';

// Load stripe
const promise = loadStripe(
  'pk_test_51INNm9HHHlkkraI73ICsnoVVnn1rhctRa6Gak8mrJDDurJEYzSNm4f1lDzxj9sjDRfgfxNUAIJgnKSCwxAy5bJbM006myA9dLx'
);

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const mobileAndTabletScreen = useMediaQuery({
    query: '(max-device-width: 1024px)',
  });
  const desktopScreen = useMediaQuery({ query: '(min-device-width: 1025px)' });

  // Loading
  useEffect(() => {
    setLoading(false);

    // Always start at the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Payment</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <section>
        <OrderProgress current3={true} disabled3={false} disabled4={true} />
      </section>
      {mobileAndTabletScreen && <OrderSummary />}
      <div className='payment'>
        <main>
          <div className='payment_card'>
            <div className='payment_card_title'>
              <h1>ORDER PAYMENT</h1>
              <P text='All card transactions are safe and secure.' />
            </div>
            <H2 title='Credit / Debit Card' />
            <Elements stripe={promise}>
              <PaymentForm />
            </Elements>
          </div>
        </main>
        {desktopScreen && <OrderSummary />}
      </div>
    </>
  );
};

export default Payment;
