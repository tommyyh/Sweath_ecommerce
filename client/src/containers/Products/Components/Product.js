import React, { useState } from 'react';

// Components
import H4 from '../../../components/HtmlTags/H4';
import H3 from '../../../components/HtmlTags/H3';
import Img from '../../../components/HtmlTags/Img';

const Product = ({ productTitle, productPrice, productImg, productImgAlt }) => {
  const [imageClass, setImageClass] = useState('list_product_image');

  return (
    <div className='list_product'>
      <div
        className={imageClass}
        onMouseOver={() =>
          window.innerWidth > 1025
            ? setImageClass('list_product_image list_product_image_open')
            : null
        }
        onMouseLeave={() =>
          window.innerWidth > 1025 ? setImageClass('list_product_image') : null
        }
      >
        <Img imageSrc={productImg} imageAlt={productImgAlt} />
      </div>
      <div className='list_product_info'>
        <H3 title={productTitle} />
        <H4 title={'$' + productPrice} />
      </div>
    </div>
  );
};

export default Product;
