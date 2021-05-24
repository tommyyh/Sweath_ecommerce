import React, { useState, useEffect } from 'react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { allowFinish } from '../../../actions/allowFinish';

// Components
import Button from '../../../components/Buttons/Button';
import H5 from '../../../components/HtmlTags/H5';

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    succeeded: false,
    error: null,
    processing: false,
    disabled: true,
    clientSecret: '',
  });
  const stripe = useStripe();
  const { push } = useHistory();
  const elements = useElements();
  const dispatch = useDispatch();
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontSize: '14.5px',
        '::placeholder': {
          color: '#808080',
        },
      },
      invalid: {
        color: '#e72d34',
        iconColor: '#e72d34',
      },
    },
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await axios.post('/checkout/payment');

      setPayment({ ...payment, clientSecret: res.data.clientSecret });
    };

    fetchClientSecret(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (e) => {
    // Display errors
    setPayment({
      ...payment,
      disabled: e.empty,
      error: e.error ? e.error.message : '',
    });
  };

  const handleSubmit = async () => {
    setPayment({ ...payment, processing: true });

    const payload = await stripe.confirmCardPayment(payment.clientSecret, {
      payment_method: {
        card: elements.getElement(
          CardNumberElement,
          CardExpiryElement,
          CardCvcElement
        ),
      },
    });

    if (payload.error) {
      setPayment({
        ...payment,
        error: `Payment failed ${payload.error.message}`,
        processing: false,
      });
    } else {
      setPayment({
        ...payment,
        error: null,
        processing: false,
        succeeded: true,
      });
      dispatch(allowFinish());
      push('/finish-order');
    }
  };

  return (
    <div className='payment_card_form'>
      <CardNumberElement
        id='card_number'
        options={cardStyle}
        onChange={handleChange}
      />
      <span>
        <CardExpiryElement
          id='card_expiry'
          options={cardStyle}
          onChange={handleChange}
        />
        <CardCvcElement
          id='card_cvc'
          options={cardStyle}
          onChange={handleChange}
        />
      </span>
      {payment.error && <H5 title={payment.error} tagClass='payment_failed' />}
      <Button
        buttonTitle='FINISH ORDER'
        buttonClass='payment_submit'
        disabled={payment.processing || payment.disabled || payment.succeeded}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default PaymentForm;
