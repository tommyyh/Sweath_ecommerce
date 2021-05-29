import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

// Styles
import './favorite.scss';

// Components
import H3 from '../../components/HtmlTags/H3';
import Loading from '../../components/Loading/Loading';
import FavoriteProduct from './Components/FavoriteProduct';

const Favorite = () => {
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchFavorite = async () => {
      const res = await axios.post('/products/favorite-products');

      if (res.data.status === 200) {
        setFavorite(res.data.favorite);
      }
      setLoading(false);
    };

    fetchFavorite(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProduct = async (product) => {
    const res = await axios.delete(`/products/favorite/remove/${product}`);

    if (res.data.status === 200) {
      setFavorite(
        favorite.filter((favoriteProduct) => favoriteProduct.slug !== product)
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Favorite</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <section>
        <div className='favorite_title'>
          <div className='favorite_title_group'>
            <h1>MY FAVORITE ({favorite.length})</h1>
          </div>
        </div>
      </section>
      <main>
        <div className='favorite'>
          <div className='favorite_list'>
            {!favorite[0] ? (
              <H3
                tagClass='favorite_noProducts'
                title="You don't have any favorite products"
              />
            ) : (
              favorite.map((favoriteProduct) => (
                <FavoriteProduct
                  productTitle={favoriteProduct.title}
                  productPrice={`${favoriteProduct.totalPrice}`}
                  productImg={favoriteProduct.image1}
                  productImgAlt={favoriteProduct.title}
                  productSlug={favoriteProduct.slug}
                  removeProduct={removeProduct}
                  key={favoriteProduct.id}
                  productOldPrice={favoriteProduct.price}
                  productDiscount={favoriteProduct.discount}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorite;
