import React, { useState } from 'react';

// Components
import H4 from '../../../components/HtmlTags/H4';
import Img from '../../../components/HtmlTags/Img';
import H5 from '../../../components/HtmlTags/H5';

const PopularProduct = ({
  productTitle,
  productPrice,
  productImg,
  productImgAlt,
}) => {
  const [productHover, setProductHover] = useState('popular_product_img');

  return (
    <div
      className='popular_product'
      onMouseOver={() =>
        window.innerWidth > 1025
          ? setProductHover('popular_product_img popular_product_img_zoom')
          : null
      }
      onMouseLeave={() =>
        window.innerWidth > 1025 ? setProductHover('popular_product_img') : null
      }
    >
      <Img
        imageSrc={productImg}
        imageAlt={productImgAlt}
        imageClass={productHover}
      />
      <H4 title={productTitle} />
      <H5 title={productPrice} />
    </div>
  );
};

export default PopularProduct;
