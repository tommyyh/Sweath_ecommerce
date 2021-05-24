import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// Components
import Img from '../../../components/HtmlTags/Img';
import H3 from '../../../components/HtmlTags/H3';
import H4 from '../../../components/HtmlTags/H4';
import Option from '../../../components/HtmlTags/Option';
import H5 from '../../../components/HtmlTags/H5';

// Assets
import Times from '../../../assets/svg/times.svg';

const CartItem = ({
  productImg,
  productAlt,
  productTitle,
  productCategory,
  productPrice,
  defaultProductPrice,
  productDiscount,
  removeProduct,
  productSlug,
  productQuantity,
  updateQuantity,
}) => {
  return (
    <>
      <div className='cart_item'>
        <span>
          <div className='cart_item_img'>
            <Link to={`/product/${productSlug}`} target='_blank'>
              <Img imageSrc={productImg} imageAlt={productAlt} />
            </Link>
          </div>
          <div className='cart_item_info'>
            <div className='cart_item_info_title'>
              <H3 title={productTitle} />
              <H4 title={productCategory} />
            </div>
            <div className='cart_item_price'>
              <select
                value={productQuantity}
                onChange={(e) => updateQuantity(productSlug, e.target.value)}
              >
                <Option optionValue='1' key={uuid()} optionName='1' />
                <Option optionValue='2' key={uuid()} optionName='2' />
                <Option optionValue='3' key={uuid()} optionName='3' />
                <Option optionValue='4' key={uuid()} optionName='4' />
                <Option optionValue='5' key={uuid()} optionName='5' />
              </select>
              <span>
                {productDiscount === 0 ? (
                  <H4 title={productPrice} />
                ) : (
                  <>
                    <H4
                      title={productPrice}
                      tagClass='cart_item_price_discount'
                    />
                    <strike>
                      <H5 title={defaultProductPrice} />
                    </strike>
                  </>
                )}
              </span>
            </div>
            <div className='cart_item_options_desktop'>
              <div
                className='cart_item_options_desktop_remove'
                onClick={() => removeProduct(productSlug)}
              >
                <Img imageSrc={Times} imageAlt='Times icon' />
                <H5 title='Remove' />
              </div>
              <div className='cart_item_options_desktop_favorite'>
                <FaRegHeart size={14} />
                <H5 title='Favorite' />
              </div>
            </div>
          </div>
        </span>
        <div className='cart_item_price_desktop'>
          <select
            value={productQuantity}
            onChange={(e) => updateQuantity(productSlug, e.target.value)}
          >
            <Option optionValue='1' key={uuid()} optionName='1' />
            <Option optionValue='2' key={uuid()} optionName='2' />
            <Option optionValue='3' key={uuid()} optionName='3' />
            <Option optionValue='4' key={uuid()} optionName='4' />
            <Option optionValue='5' key={uuid()} optionName='5' />
          </select>
          <div>
            {productDiscount === 0 ? (
              <H4 title={productPrice} />
            ) : (
              <>
                <strike>
                  <H5 title={defaultProductPrice} />
                </strike>
                <H4 title={productPrice} tagClass='cart_item_price_discount' />
              </>
            )}
          </div>
        </div>
        <div
          className='cart_item_options'
          onClick={() => removeProduct(productSlug)}
        >
          <Img imageSrc={Times} imageAlt='Times icon' />
          <FaRegHeart size={window.innerWidth < 480 ? 19 : 24} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
