import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import H4 from '../../../components/HtmlTags/H4';
import H3 from '../../../components/HtmlTags/H3';
import H5 from '../../../components/HtmlTags/H5';
import Img from '../../../components/HtmlTags/Img';

const FavoriteProduct = ({
  productTitle,
  productPrice,
  productImg,
  productImgAlt,
  productSlug,
  removeProduct,
  productDiscount,
  productOldPrice,
}) => {
  const [imageClass, setImageClass] = useState('list_favorite_image');
  const [linkOpen, setLinkOpen] = useState(true);

  return (
    <>
      {productDiscount === 0 ? (
        <div className='list_favorite'>
          <Link to={!linkOpen ? '#' : `/product/${productSlug}`}>
            <div
              className={imageClass}
              onMouseOver={() =>
                window.innerWidth > 1025
                  ? setImageClass(
                      'list_favorite_image list_favorite_image_open'
                    )
                  : null
              }
              onMouseLeave={() =>
                window.innerWidth > 1025
                  ? setImageClass('list_favorite_image')
                  : null
              }
            >
              <Img
                imageSrc={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${productImg}`}
                imageAlt={productImgAlt}
              />
              <svg
                width='5.5vw'
                height='5.5vw'
                viewBox='0 0 29 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => removeProduct(productSlug)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setLinkOpen(false)}
                onMouseLeave={() => setLinkOpen(true)}
              >
                <rect
                  x='6.59961'
                  y='7.54254'
                  width='1.66667'
                  height='20'
                  rx='0.833333'
                  transform='rotate(-45 6.59961 7.54254)'
                  fill='black'
                />
                <rect
                  x='6.48193'
                  y='20.6241'
                  width='20'
                  height='1.66667'
                  rx='0.833333'
                  transform='rotate(-45 6.48193 20.6241)'
                  fill='black'
                />
              </svg>
            </div>
            <div className='list_favorite_info'>
              <H3 title={productTitle} />
              <H4 title={'$' + productPrice} />
            </div>
          </Link>
        </div>
      ) : (
        <Link to={!linkOpen ? '#' : `/product/${productSlug}`}>
          <div
            className='list_sale'
            onMouseOver={() =>
              window.innerWidth > 1025
                ? setImageClass('list_favorite_image list_favorite_image_open')
                : null
            }
            onMouseLeave={() =>
              window.innerWidth > 1025
                ? setImageClass('list_favorite_image')
                : null
            }
          >
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
              <Img
                imageSrc={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${productImg}`}
                imageAlt={productImgAlt}
              />
              <svg
                width='5.5vw'
                height='5.5vw'
                viewBox='0 0 29 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => removeProduct(productSlug)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setLinkOpen(false)}
                onMouseLeave={() => setLinkOpen(true)}
              >
                <rect
                  x='6.59961'
                  y='7.54254'
                  width='1.66667'
                  height='20'
                  rx='0.833333'
                  transform='rotate(-45 6.59961 7.54254)'
                  fill='black'
                />
                <rect
                  x='6.48193'
                  y='20.6241'
                  width='20'
                  height='1.66667'
                  rx='0.833333'
                  transform='rotate(-45 6.48193 20.6241)'
                  fill='black'
                />
              </svg>
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
        </Link>
      )}
    </>
  );
};

export default FavoriteProduct;
