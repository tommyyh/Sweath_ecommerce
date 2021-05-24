import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { allowPayment } from '../../actions/allowPayment';

// Styles
import './shipping.scss';

// Components
import Loading from '../../components/Loading/Loading';
import OrderProgress from '../../components/OrderProgress/OrderProgress';
import Form from '../../components/Forms/Form';
import Button from '../../components/Buttons/Button';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const Shipping = () => {
  const [loading, setLoading] = useState(true);
  const mobileAndTabletScreen = useMediaQuery({
    query: '(max-device-width: 1024px)',
  });
  const desktopScreen = useMediaQuery({ query: '(min-device-width: 1025px)' });
  const userName = useSelector((state) => state.userName).split(' ');
  const userFirstName = userName[0];
  const userLastName = userName[1];
  const { push } = useHistory();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);
  const [inputError, setInputError] = useState({
    firstName: 'shipping_firstName',
    lastName: 'shipping_lastName',
    addressLine1: 'shipping_addressLine1',
    addressLine2: 'shipping_addressLine2',
    city: 'shipping_city',
    state: 'shipping_state',
    zipCode: 'shipping_zipCode',
    company: 'shipping_company',
    email: 'shipping_email',
    phone: 'shipping_phone',
  });
  const [inputPlaceholder, setInputPlaceholder] = useState({
    firstName: 'First Name',
    lastName: 'Last Name',
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2 (Optional)',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    company: 'Company Name (Optional)',
    email: 'Email Address',
    phone: 'Phone Number',
  });
  const [shippingInfo, setShippingInfo] = useState({
    firstName: userFirstName ? userFirstName : '',
    lastName: userLastName ? userLastName : '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    company: '',
    email: userEmail !== '' ? userEmail : '',
    phone: '',
  });

  // Loading
  useEffect(() => {
    setLoading(false);
  }, []);

  // Handle input change
  const inputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Submit info
  const submitShipping = async () => {
    // Validate user input
    if (!shippingInfo.firstName) {
      setInputError({
        ...inputError,
        firstName: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        firstName: 'This field required',
      });

      return;
    }

    if (!shippingInfo.lastName) {
      setInputError({
        ...inputError,
        lastName: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        lastName: 'This field required',
      });

      return;
    }

    if (!shippingInfo.addressLine1) {
      setInputError({
        ...inputError,
        addressLine1: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        addressLine1: 'This field required',
      });

      return;
    }

    if (!shippingInfo.city) {
      setInputError({
        ...inputError,
        city: 'shipping_missing_field',
      });
      setInputPlaceholder({ ...inputPlaceholder, city: 'This field required' });

      return;
    }

    if (!shippingInfo.state) {
      setInputError({
        ...inputError,
        state: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        state: 'This field required',
      });

      return;
    }

    if (!shippingInfo.zipCode) {
      setInputError({
        ...inputError,
        zipCode: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        zipCode: 'This field required',
      });

      return;
    }

    if (!shippingInfo.email) {
      setInputError({
        ...inputError,
        email: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        email: 'This field required',
      });

      return;
    }

    if (!shippingInfo.phone) {
      setInputError({
        ...inputError,
        phone: 'shipping_missing_field',
      });
      setInputPlaceholder({
        ...inputPlaceholder,
        phone: 'This field required',
      });

      return;
    }

    const res = await axios.post('/checkout/shipping-info', shippingInfo);

    if (res.data.status === 201) {
      dispatch(allowPayment());
      push('/checkout/order-payment');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Shipping Information</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <section>
        <OrderProgress current2={true} disabled3={true} disabled4={true} />
      </section>
      {mobileAndTabletScreen && <OrderSummary />}
      <div className='shipping'>
        <main>
          <div className='shipping_forms'>
            <h1>SHIPPING INFORMATION</h1>
            <span className='shipping_name'>
              <Form
                formType='text'
                formName='firstName'
                formPlaceholder={inputPlaceholder.firstName}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_firstName',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'First Name',
                  });
                }}
                formValue={shippingInfo.firstName}
                formId={inputError.firstName}
              />
              <Form
                formType='text'
                formName='lastName'
                formPlaceholder={inputPlaceholder.lastName}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_lastName',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'Last Name',
                  });
                }}
                formValue={shippingInfo.lastName}
                formId={inputError.lastName}
              />
            </span>
            <Form
              formType='text'
              formName='addressLine1'
              formPlaceholder={inputPlaceholder.addressLine1}
              autocompleteOff='false'
              onChange={(e) => {
                inputChange(e);
                setInputError({
                  ...inputError,
                  [e.target.name]: 'shipping_addressLine1',
                });
                setInputPlaceholder({
                  ...inputPlaceholder,
                  [e.target.name]: 'Address Line 1',
                });
              }}
              formValue={shippingInfo.addressLine1}
              formId={inputError.addressLine1}
            />
            <Form
              formType='text'
              formName='addressLine2'
              formPlaceholder={inputPlaceholder.addressLine2}
              autocompleteOff='false'
              onChange={inputChange}
              formValue={shippingInfo.addressLine2}
              formId={inputError.addressLine2}
            />
            <span className='shipping_location'>
              <Form
                formType='text'
                formName='city'
                formPlaceholder={inputPlaceholder.city}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_city',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'City',
                  });
                }}
                formValue={shippingInfo.city}
                formId={inputError.city}
              />
              <Form
                formType='text'
                formName='state'
                formPlaceholder={inputPlaceholder.state}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_state',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'State',
                  });
                }}
                formValue={shippingInfo.state}
                formId={inputError.state}
              />
              <Form
                formType='number'
                formName='zipCode'
                formPlaceholder={inputPlaceholder.zipCode}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_zipCode',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'Zip Code',
                  });
                }}
                formValue={shippingInfo.zipCode}
                formId={inputError.zipCode}
              />
            </span>
            <Form
              formType='text'
              formName='company'
              formPlaceholder={inputPlaceholder.company}
              autocompleteOff='false'
              onChange={inputChange}
              formValue={shippingInfo.company}
              formId={inputError.company}
            />
            <span className='shipping_contact'>
              <Form
                formType='email'
                formName='email'
                formPlaceholder={inputPlaceholder.email}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_email',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'Email Address',
                  });
                }}
                formValue={shippingInfo.email}
                formId={inputError.email}
              />
              <Form
                formType='tel'
                formName='phone'
                formPlaceholder={inputPlaceholder.phone}
                autocompleteOff='false'
                onChange={(e) => {
                  inputChange(e);
                  setInputError({
                    ...inputError,
                    [e.target.name]: 'shipping_phone',
                  });
                  setInputPlaceholder({
                    ...inputPlaceholder,
                    [e.target.name]: 'Phone Number',
                  });
                }}
                formValue={shippingInfo.phone}
                formId={inputError.phone}
              />
            </span>
            <Button buttonTitle='CHECKOUT' onClick={submitShipping} />
          </div>
        </main>
        {desktopScreen && <OrderSummary />}
      </div>
    </>
  );
};

export default Shipping;
