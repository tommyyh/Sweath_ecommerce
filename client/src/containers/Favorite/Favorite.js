import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaTimesCircle } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

// Styles
import './favorite.scss';

// Components
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import Loading from '../../components/Loading/Loading';
import FavoriteProduct from './Components/FavoriteProduct';
import FavoriteSortOption from './Components/FavoriteSortOption';

const Favorite = () => {
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [onSaleOpen, setOnSaleOpen] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState({
    sortBy: 'newest',
    brand: {
      apple: false,
      dell: false,
      huawei: false,
      nokia: false,
    },
    onSale: {
      sale: false,
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchFavorite = async () => {
      const res = await axios.post('/products/favorite-products', filter);

      if (res.data.status === 200) {
        setFavorite(res.data.favorite);
      }
      setLoading(false);
    };

    fetchFavorite(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchFilteredFavorite = async () => {
      const res = await axios.post('/products/favorite-products', filter);

      setFavorite(res.data.favorite);
    };

    fetchFilteredFavorite(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const removeProduct = async (product) => {
    const res = await axios.delete(`/products/favorite/remove/${product}`);

    if (res.data.status === 200) {
      setFavorite(
        favorite.filter((favoriteProduct) => favoriteProduct.slug !== product)
      );
    }
  };

  if (loading) return <Loading />;

  // If menu is open -> lock scrolling
  if (filtersOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'initial';
  }

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
            <FaSortAmountDown
              size={window.innerWidth < 480 ? 23.5 : 31}
              onClick={() => setFiltersOpen(!filtersOpen)}
            />
          </div>
        </div>
      </section>
      <main>
        <div className='favorite'>
          <div
            className={
              filtersOpen ? 'products_filters' : 'products_filters hidden'
            }
            onChange={() => setFiltersOpen(false)}
          >
            <div>
              <div className='products_filters_title'>
                <H2 title='Filters' />
                <FaTimesCircle
                  size={window.innerWidth < 480 ? 33 : 40}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                />
              </div>
              <div>
                <div
                  className={
                    sortByOpen
                      ? 'products_filter_sortBy products_filter_sortBy_open'
                      : 'products_filter_sortBy'
                  }
                  onChange={(e) =>
                    setFilter({ ...filter, sortBy: e.target.value })
                  }
                >
                  <FavoriteSortOption
                    sortOptionTitle='Sort By'
                    sortOption1='Newest'
                    sortOption2='Most Popular'
                    sortOption3='Price: Low - High'
                    sortOption4='Price: High - Low'
                    sortOptionName1='newest'
                    sortOptionName2='mostPopular'
                    sortOptionName3='priceLowHigh'
                    sortOptionName4='priceHighLow'
                    formGroup='sortBy'
                    checkbox={false}
                    openByDefault={true}
                    setOpen={() => setSortByOpen(!sortByOpen)}
                    filterState={sortByOpen}
                  />
                  <div className='filter_sortBy_sep'></div>
                </div>
                <div
                  className={
                    brandOpen
                      ? 'products_filter_brand products_filter_brand_open'
                      : 'products_filter_brand'
                  }
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      brand: {
                        ...filter.brand,
                        [e.target.name]: e.target.checked,
                      },
                    })
                  }
                >
                  <FavoriteSortOption
                    sortOptionTitle='Brand'
                    sortOption1='Apple'
                    sortOption2='Dell'
                    sortOption3='Huawei'
                    sortOption4='Nokia'
                    sortOptionName1='apple'
                    sortOptionName2='dell'
                    sortOptionName3='huawei'
                    sortOptionName4='nokia'
                    formGroup='brands'
                    checkbox={true}
                    openByDefault={false}
                    setOpen={() => setBrandOpen(!brandOpen)}
                    filterState={brandOpen}
                  />
                  <div className='filter_brand_sep'></div>
                </div>
                <div
                  className={
                    onSaleOpen
                      ? 'products_filter_onSale products_filter_onSale_open'
                      : 'products_filter_onSale'
                  }
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      onSale: {
                        ...filter.onSale,
                        [e.target.name]: e.target.checked,
                      },
                    })
                  }
                >
                  <FavoriteSortOption
                    sortOptionTitle='On Sale'
                    sortOptionName1='sale'
                    sortOption1='Sale'
                    checkbox={true}
                    openByDefault={false}
                    setOpen={() => setOnSaleOpen(!onSaleOpen)}
                    filterState={onSaleOpen}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='favorite_list'>
            {!favorite[0] ? (
              <H3
                tagClass='noProducts_available'
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
