import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Img from '../../HtmlTags/Img';
import H2 from '../../HtmlTags/H2';
import H3 from '../../HtmlTags/H3';

const SearchResult = ({
  productImg,
  productTitle,
  productPrice,
  productLink,
}) => {
  return (
    <div>
      <Link to={`/product/${productLink}`}>
        <Img
          imageSrc={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${productImg}`}
          imageAlt='A product'
        />
      </Link>
      <div className='search_result_text'>
        <H2 title={productTitle} />
        <H3 title={'$' + productPrice} />
      </div>
    </div>
  );
};

export default SearchResult;
