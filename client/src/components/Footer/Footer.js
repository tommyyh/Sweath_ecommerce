import React from 'react';
import {
  FaFacebook,
  FaPinterest,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

// Styles
import './footer.scss';

// Components
import Form from '../Forms/Form';
import H2 from '../HtmlTags/H2';
import H3 from '../HtmlTags/H3';
import Button from '../Buttons/Button';

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <span>
          <div className='footer_help'>
            <H2 title='HELP' />
            <H3 title='help@sweath.com' tagClass='footer_help_first' />
            <H3 title='refunds & complaints' />
            <H3 title='frequently asked questions' />
            <H3 title='contact us' />
          </div>
          <div className='footer_info'>
            <H2 title='INFORMTAION' />
            <H3
              title='Address: 4150 Washington Avenue'
              tagClass='footer_info_first'
            />
            <H3 title='Phone: 422 255 1805' />
            <H3 title='Email: sweath@gmail.com' />
          </div>
          <div className='footer_newsletter'>
            <H2 title='NEWSLETTER' />
            <div className='footer_newsletter_form'>
              <Form
                formType='text'
                formName='newsletterUserEmail'
                formPlaceholder='Email Address...'
              />
              <Button buttonTitle='SUBSCRIBE' noArrow={true} />
            </div>
          </div>
        </span>
        <div className='footer_end'>
          <H3 title='&copy; 2021 Sweath. All rights reserved - Font awsome' />
          <div className='footer_socials'>
            <FaFacebook
              className='fb_icon'
              size={window.innerWidth > 1025 ? 27 : '5.1%'}
            />
            <FaPinterest
              className='linkedin_icon'
              size={window.innerWidth > 1025 ? 27 : '5.1%'}
            />
            <FaTwitter
              className='twitter_icon'
              size={window.innerWidth > 1025 ? 27 : '5.1%'}
            />
            <FaInstagram
              className='ig_icon'
              size={window.innerWidth > 1025 ? 27 : '5.1%'}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
