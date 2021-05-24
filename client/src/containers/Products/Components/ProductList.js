import React from 'react';
import { Link } from 'react-router-dom';
import SaleProduct from '../../Sale/Components/SaleProduct';
import Product from '../Components/Product';
import H3 from '../../../components/HtmlTags/H3';

const ProductList = ({ products }) => {
  return (
    <div className='products_list'>
      {products.Products[0] ? (
        products.Products.map((product) =>
          product.discount === 0 ? (
            <Link to={`/product/${product.slug}`} key={product.id}>
              <Product
                productTitle={product.title}
                productPrice={product.price}
                productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                productImgAlt={product.title}
              />
            </Link>
          ) : (
            <Link to={`/product/${product.slug}`} key={product.id}>
              <SaleProduct
                productTitle={product.title}
                productPrice={product.totalPrice}
                productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                productImgAlt={product.title}
                productOldPrice={product.price}
                productDiscount={product.discount}
              />
            </Link>
          )
        )
      ) : (
        <H3
          tagClass='noProducts_available'
          title='There are currently no products in this section'
        />
      )}
    </div>
  );
};

export default ProductList;
