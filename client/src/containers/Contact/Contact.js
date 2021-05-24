import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

// Styles
import './contact.scss';

// Assets
import PlusImg from '../../assets/svg/plus.svg';
import MinusImg from '../../assets/svg/minus.svg';

// Components
import Loading from '../../components/Loading/Loading';
import H2 from '../../components/HtmlTags/H2';
import Img from '../../components/HtmlTags/Img';
import H3 from '../../components/HtmlTags/H3';
import Form from '../../components/Forms/Form';
import Button from '../../components/Buttons/Button';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [contactInfoOpen, setContactInfoOpen] = useState(true);
  const [formValues, setFormValues] = useState({
    contactName: '',
    contactEmail: '',
    contactMsg: '',
  });
  const [formError, setFormError] = useState({
    contactName: 'contact_contactName',
    contactEmail: 'contact_contactEmail',
    contactMsg: 'contact_contactMsg',
  });
  const [placeholder, setPlaceholder] = useState({
    contactName: 'Full Name',
    contactEmail: 'Email Address',
    contactMsg: 'Your Message',
  });

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

  const sendMessage = async () => {
    if (!formValues.contactName) {
      setPlaceholder({ ...placeholder, contactName: 'This field is required' });
      setFormError({
        ...formError,
        contactName: 'contact_contactName_missing',
      });

      return;
    }

    if (!formValues.contactEmail) {
      setPlaceholder({
        ...placeholder,
        contactEmail: 'This field is required',
      });
      setFormError({
        ...formError,
        contactEmail: 'contact_contactEmail_missing',
      });

      return;
    }

    if (!formValues.contactMsg) {
      setPlaceholder({ ...placeholder, contactMsg: 'This field is required' });
      setFormError({ ...formError, contactMsg: 'contact_contactMsg_missing' });

      return;
    }

    const res = await axios.post('/contact', {
      contactName: formValues.contactName,
      contactEmail: formValues.contactEmail,
      contactMsg: formValues.contactMsg,
    });

    if (res.data.status === 200) {
      setFormValues({ contactName: '', contactEmail: '', contactMsg: '' });
    }
  };

  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Contact Us</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <div className='contact_us'>
        <section>
          <div className='contactInfo'>
            <div
              className={
                !contactInfoOpen
                  ? 'contactInfo_wrapper'
                  : 'contactInfo_wrapper contactInfo_wrapper_open'
              }
            >
              <div className='contactInfo_title'>
                <H2 title='Contact Info' />
                <Img
                  imageSrc={contactInfoOpen ? MinusImg : PlusImg}
                  imageAlt='Plus icon'
                  onClick={() => setContactInfoOpen(!contactInfoOpen)}
                />
              </div>
              <H3 title='Address: 4150 Washington Avenue' />
              <H3 title='Phone number: 84589339' />
              <H3 title='Email Address: sweath@gmail.com' />
            </div>
          </div>
        </section>
        <main>
          <div className='contact_forms'>
            <h1>CONTACT US</h1>
            <Form
              formType='text'
              formName='contactName'
              formPlaceholder={placeholder.contactName}
              onChange={(e) => {
                handleOnChange(e);
                setFormError({
                  ...formError,
                  contactName: 'contact_contactName',
                });
                setPlaceholder({
                  ...placeholder,
                  contactName: 'Full Name',
                });
              }}
              formValue={formValues.contactName}
              formId={formError.contactName}
            />
            <Form
              formType='email'
              formName='contactEmail'
              formPlaceholder={placeholder.contactEmail}
              onChange={(e) => {
                handleOnChange(e);
                setFormError({
                  ...formError,
                  contactEmail: 'contact_contactEmail',
                });
                setPlaceholder({
                  ...placeholder,
                  contactName: 'Email Address',
                });
              }}
              formValue={formValues.contactEmail}
              formId={formError.contactEmail}
            />
            <textarea
              name='contactMsg'
              cols='30'
              rows='10'
              placeholder={placeholder.contactMsg}
              onChange={(e) => {
                handleOnChange(e);
                setFormError({
                  ...formError,
                  contactMsg: 'contact_contactEmail',
                });
                setPlaceholder({
                  ...placeholder,
                  contactName: 'Your message',
                });
              }}
              value={formValues.contactMsg}
              id={formError.contactMsg}
            ></textarea>
            <Button buttonTitle='SEND MESSAGE' onClick={sendMessage} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;
