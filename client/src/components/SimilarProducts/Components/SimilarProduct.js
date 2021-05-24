import React from 'react';
import { Link } from 'react-router-dom';

// Components
import H4 from '../../../components/HtmlTags/H4';
import H5 from '../../../components/HtmlTags/H5';
import Img from '../../../components/HtmlTags/Img';

const SimilarProducts = ({
  productImg,
  productAlt,
  productTitle,
  productPrice,
  productSlug,
}) => {
  return (
    <div className='similar_product'>
      <Link to={`/product/${productSlug}`}>
        <div className='similar_product_rect'>
          <Img imageSrc={productImg} imageAlt={productAlt} />
        </div>
      </Link>
      <H4 title={productTitle} />
      <H5 title={productPrice} />
    </div>
  );
};

export default SimilarProducts;
