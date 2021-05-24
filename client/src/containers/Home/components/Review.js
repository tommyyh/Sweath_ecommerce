import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

// Components
import Img from '../../../components/HtmlTags/Img';
import H4 from '../../../components/HtmlTags/H4';
import H5 from '../../../components/HtmlTags/H5';
import P from '../../../components/HtmlTags/P';

const Review = ({
  image,
  imageAlt,
  authorName,
  authorStatus,
  reviewText,
  reviewRating,
}) => {
  return (
    <div className='review'>
      <div className='review_author'>
        <Img imageSrc={image} imageAlt={imageAlt} />
        <div className='review_author_info'>
          <H4 title={authorName} />
          <H5 title={authorStatus} />
        </div>
      </div>
      <div className='review_main'>
        <FaQuoteLeft fill='#4870ff' size={'3.2rem'} />
        <div className='review_text'>
          <P text={reviewText} />
        </div>
        <span>
          <div className='review_author_info_desktop'>
            <H4 title={authorName} />
            <H5 title={authorStatus} />
          </div>
          <div className='review_end_desktop'>
            <H4 title={reviewRating} />
          </div>
        </span>
      </div>
      <div className='review_end'>
        <H4 title={reviewRating} />
      </div>
    </div>
  );
};

export default Review;
