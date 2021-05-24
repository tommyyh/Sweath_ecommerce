import React from 'react';

// Styles
import './review.scss';

import P from '../../components/HtmlTags/P';
import H3 from '../../components/HtmlTags/H3';
import H4 from '../../components/HtmlTags/H4';
import H5 from '../../components/HtmlTags/H5';

const Review = ({ reviewTitle, reviewRating, reviewAuthor, reviewContent }) => {
  return (
    <div className='show_review'>
      <H3 title={reviewTitle} />
      <div className='share_review_author'>
        <H4 title={reviewRating} />
        <H5 title={reviewAuthor} />
      </div>
      <P text={reviewContent} />
    </div>
  );
};

export default Review;
