import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

// Styles
import './finish.scss';

// Components
import Loading from '../../components/Loading/Loading';
import P from '../../components/HtmlTags/P';

const Finish = () => {
  const [loading, setLoading] = useState(true);

  // Loading
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    setLoading(true);

    const saveOrder = async () => {
      await axios.get('/checkout/finish-order');
    };

    saveOrder();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Thank you!</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <main>
        <div className='thank_you_section'>
          <h1>THANK YOU!</h1>
          <P
            text='Your order was completed successfully. An email receipt including the details about your order has been sent to your email address.'
            tagClass='thank_you_text1'
          />
          <P
            text='You can visit the My Account page at any time to check the status of your order.'
            tagClass='thank_you_text2'
          />
          <div className='thank_you_goBack'>
            <FaChevronLeft fill='#4870ff' size={14} />
            <Link to='/'>Go To Home Page</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Finish;
