import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaTimesCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

// Components
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import Loading from '../../components/Loading/Loading';
import SaleProduct from '../Sale/Components/SaleProduct';
import SaleSortOption from '../Sale/Components/SaleSortOption';
import NotFound from '../NotFound/NotFound';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [onSaleOpen, setOnSaleOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const { title } = useParams();
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    const fetchProducts = async () => {
      const res = await axios.post('/products/sales', filter);

      setCategory(res.data.category);
      setLoading(false);
    };

    fetchProducts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  // Fetch products after filtering
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const res = await axios.post('/products/products-sales', filter);

      setCategory(res.data.category);
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

  return (
    <>
      {!category ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            {/* Head */}
            <Helmet>
              <title>Sweath: Sales</title>
            </Helmet>
          </HelmetProvider>
          {/* Body */}
          <section>
            <div className='sale_title'>
              <H2 title='ALL PRODUCTS' />
              <div className='sale_title_group'>
                <h1>PRODUCTS ON SALE ({category.length})</h1>
                <FaSortAmountDown
                  size={window.innerWidth < 480 ? 23.5 : 31}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                />
              </div>
            </div>
          </section>
          <main>
            <div className='products_sale'>
              <div
                className={filtersOpen ? 'sale_filters' : 'sale_filters hidden'}
                onChange={() => setFiltersOpen(false)}
              >
                <div>
                  <div className='sale_filters_title'>
                    <H2 title='Filters' />
                    <FaTimesCircle
                      size={window.innerWidth < 480 ? 33 : 40}
                      onClick={() => setFiltersOpen(!filtersOpen)}
                    />
                  </div>
                  <div
                    className={
                      sortByOpen
                        ? 'sale_filter_sortBy sale_filter_sortBy_open'
                        : 'sale_filter_sortBy'
                    }
                    onChange={(e) =>
                      setFilter({ ...filter, sortBy: e.target.value })
                    }
                  >
                    <SaleSortOption
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
                        ? 'sale_filter_brand sale_filter_brand_open'
                        : 'sale_filter_brand'
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
                    <SaleSortOption
                      sortOptionTitle='Brand'
                      sortOption1='Apple'
                      sortOption2='Dell'
                      sortOption3='Huawei'
                      sortOption4='Nokia'
                      sortOptionName1='apple'
                      sortOptionName2='dell'
                      sortOptionName3='huawei'
                      sortOptionName4='nokia'
                      formGroup='sortBy'
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
                        ? 'sale_filter_onSale sale_filter_onSale_open'
                        : 'sale_filter_onSale'
                    }
                    onChange={(e) =>
                      setFilter({ ...filter, discount: e.target.value })
                    }
                  >
                    <SaleSortOption
                      sortOptionTitle='On Sale'
                      sortOptionName1='sale'
                      sortOption1='Sale'
                      checkbox={true}
                      openByDefault={false}
                      setOpen={() => setOnSaleOpen(!onSaleOpen)}
                      filterState={onSaleOpen}
                      disabled1={true}
                    />
                  </div>
                </div>
              </div>
              <div className='sale_list'>
                {category ? (
                  category.map((product) => (
                    <Link to={`/product/${product.slug}`} key={product.id}>
                      <SaleProduct
                        productTitle={product.title}
                        productPrice={product.totalPrice}
                        productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                        productImgAlt={product.title}
                        productDiscount={product.discount}
                        productOldPrice={product.price}
                      />
                    </Link>
                  ))
                ) : (
                  <H3
                    tagClass='noProducts_available'
                    title='There are currently no products in this section'
                  />
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Products;
