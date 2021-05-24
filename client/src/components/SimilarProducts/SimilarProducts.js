import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Styles
import './similarProducts.scss';

// Components
import SimilarProduct from './Components/SimilarProduct';
import H2 from '../HtmlTags/H2';

const SimilarProducts = () => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const res = await axios.get('/products/similar');

      setSimilar(res.data.products);
    };

    fetchSimilar();
  }, []);

  return (
    <section>
      <div className='similar_products'>
        <H2 title='YOU MAY ALSO LIKE' />
        <div className='similar_products_list'>
          {similar.map((product) => (
            <SimilarProduct
              productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
              productAlt={product.title}
              productPrice={`$${product.totalPrice}`}
              productTitle={product.title}
              key={product.id}
              productSlug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
