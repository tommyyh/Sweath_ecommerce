import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaTimesCircle } from 'react-icons/fa';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Styles
import './products.scss';

// Components
import H2 from '../../components/HtmlTags/H2';
import Loading from '../../components/Loading/Loading';
import SortOption from './Components/SortOption';
import NotFound from '../NotFound/NotFound';
import ProductList from './Components/ProductList';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [onSaleOpen, setOnSaleOpen] = useState(false);
  const [products, setProducts] = useState();
  const location = useLocation();
  const { category } = useParams();
  const userRole = useSelector((state) => state.userRole);
  const history = useHistory();
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

  // Fetch products
  useEffect(() => {
    setLoading(true);

    // Get products
    const getProducts = async () => {
      const res = await axios.post(`/products/category/${category}`, filter);

      setProducts(res.data.category);
      setLoading(false);
    };

    getProducts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Fetch products after filtering
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const res = await axios.post(window.location.pathname, filter);

      setProducts(res.data.category);
    };

    fetchFilteredProducts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  if (loading) return <Loading />;

  // If menu is open -> lock scrolling
  if (filtersOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'initial';
  }

  const deleteCategory = async () => {
    const res = await axios.delete(window.location.pathname);

    if (res.data.status === 200) {
      history.push('/');
    }
  };

  return (
    <>
      {!products ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            {/* Head */}
            <Helmet>
              <title>{`Sweath: ${products.title}`}</title>
            </Helmet>
          </HelmetProvider>
          {/* Body */}
          <section>
            <div className='products_title'>
              <H2 title={`PRODUCTS / ${products.title.toUpperCase()}`} />
              <div className='products_title_group'>
                {userRole === 'ADMIN' ? (
                  <h1>
                    {`${products.title.replace(/-/, ' ').toUpperCase()} (${
                      products.Products.length
                    }) `}
                    -{' '}
                    <span className='products_delete' onClick={deleteCategory}>
                      DELETE
                    </span>
                  </h1>
                ) : (
                  <h1>
                    {`${products.title.replace(/-/, ' ').toUpperCase()} (${
                      products.Products.length
                    }) `}
                  </h1>
                )}
                <FaSortAmountDown
                  size={window.innerWidth < 480 ? 23.5 : 31}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                />
              </div>
            </div>
          </section>
          <main>
            <div className='products'>
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
                      <SortOption
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
                      <SortOption
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
                      <SortOption
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
              <ProductList products={products} />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Products;
