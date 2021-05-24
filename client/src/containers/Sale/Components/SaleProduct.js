import React, { useState } from 'react';

// Components
import H4 from '../../../components/HtmlTags/H4';
import H3 from '../../../components/HtmlTags/H3';
import H5 from '../../../components/HtmlTags/H5';
import Img from '../../../components/HtmlTags/Img';

const Product = ({
  productTitle,
  productPrice,
  productOldPrice,
  productImg,
  productImgAlt,
  productDiscount,
}) => {
  const [imageClass, setImageClass] = useState('list_sale_image');

  return (
    <div className='list_sale'>
      <div
        className={imageClass}
        onMouseOver={() =>
          window.innerWidth > 1025
            ? setImageClass('list_sale_image list_sale_image_open')
            : null
        }
        onMouseLeave={() =>
          window.innerWidth > 1025 && setImageClass('list_sale_image')
        }
      >
        <Img imageSrc={productImg} imageAlt={productImgAlt} />
        <div className='list_sale_img_percentage'>
          <H5 title={`-${productDiscount}%`} />
        </div>
      </div>
      <div className='list_sale_info'>
        <H3 title={productTitle} />
        <span>
          <H4 title={'$' + productPrice} />
          <strike>
            <H5 title={`$${productOldPrice}`} />
          </strike>
        </span>
      </div>
    </div>
  );
};

export default Product;
