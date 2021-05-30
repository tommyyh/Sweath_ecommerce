import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaChevronRight, FaRegEdit, FaHeart } from 'react-icons/fa';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Styles
import './show.scss';

// Assets
import PlusImg from '../../assets/svg/plus.svg';
import MinusImg from '../../assets/svg/minus.svg';

// Components
import Loading from '../../components/Loading/Loading';
import ShowImg from './Components/ShowImg';
import ShowSpecs from './Components/ShowSpecs';
import Review from '../../components/Review/Review';
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import H4 from '../../components/HtmlTags/H4';
import H5 from '../../components/HtmlTags/H5';
import P from '../../components/HtmlTags/P';
import Img from '../../components/HtmlTags/Img';
import Button from '../../components/Buttons/Button';
import SimilarProducts from '../../components/SimilarProducts/SimilarProducts';
import NotFound from '../NotFound/NotFound';
import { openLogin } from '../../actions/menuType';

const Show = () => {
  const [loading, setLoading] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [product, setProduct] = useState({});
  const [isFavorite, setIsFavorite] = useState(Boolean);
  const { push } = useHistory();
  const { title } = useParams();
  const userRole = useSelector((state) => state.userRole);
  const isLogged = useSelector((state) => state.isLogged);
  const [averageRating, setAverageRating] = useState(Number);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    setLoading(true);

    const fetchProduct = async () => {
      const res1 = await axios.get(`/products/show/${title}`);
      const res2 = await axios.post('/products/favorite-products');

      // Get the average rating
      if (res1.data.product) {
        if (res1.data.product.Reviews[0]) {
          const ratingArray = res1.data.product.Reviews;
          const ratingAverage = ratingArray.reduce((a, b) => ({
            rating: a.rating + b.rating,
          }));
          const averageRating = ratingAverage.rating / ratingArray.length;

          setAverageRating(averageRating);
        } else {
          setAverageRating(0);
        }
      }

      setProduct(res1.data.product);

      if (isLogged) {
        let favoriteProduct;

        if (res2.data.favorite) {
          favoriteProduct = res2.data.favorite.find(
            (favoriteProduct) =>
              favoriteProduct.slug === res1.data.product.slug &&
              favoriteProduct.UserId === res2.data.userId
          );
        } else {
          favoriteProduct = false;
        }

        if (!favoriteProduct) {
          setIsFavorite(false);
        } else {
          setIsFavorite(true);
        }
      }

      setLoading(false);
    };

    fetchProduct(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const addToFavorite = async () => {
    const res = await axios.post(`/products/add-to-favorite/${title}`);

    if (res.data.status === 201) {
      setIsFavorite(true);
    }
  };

  const removeProduct = async () => {
    const res = await axios.delete(`/products/favorite/remove/${product.slug}`);

    if (res.data.status === 200) {
      setIsFavorite(false);
    }
  };

  // Delete product
  const deleteProduct = async () => {
    await axios.delete(`/products/delete/${title}`);
  };

  // Add to cart
  const addToCart = async () => {
    await axios.post(`/shopping-cart/add-to-cart/${title}`);

    push('/cart');
  };

  if (loading) return <Loading />;

  return (
    <>
      {!product ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            {/* Head */}
            <Helmet>
              <title>{`Sweath: ${product.title}`}</title>
            </Helmet>
          </HelmetProvider>
          {/* Body */}
          <div className='show_product'>
            <span>
              <main>
                <div className='show_title'>
                  <H2 title={product.CategoryTitle.toUpperCase()} />
                  <h1>{product.title.toUpperCase()}</h1>
                </div>
                <div className='show_imgs'>
                  <ShowImg
                    productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                    productAlt='Iphone 13 Pro'
                  />
                  <ShowImg
                    productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image2}`}
                    productAlt='Iphone 13 Pro'
                  />
                  <ShowImg
                    productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image3}`}
                    productAlt='Iphone 13 Pro'
                  />
                  <ShowImg
                    productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image4}`}
                    productAlt='Iphone 13 Pro'
                  />
                </div>
              </main>
              <section>
                <div className='show_reviews_desktop'>
                  <div className='show_reviews_title'>
                    <H3 title='YOUR FEEDBACK' />
                    <H2 title='PRODUCT REVIEWS' />
                    <div className='show_reviews_rating'>
                      {averageRating !== 0 && (
                        <H4
                          title={
                            averageRating === 1 ||
                            averageRating === 2 ||
                            averageRating === 3 ||
                            averageRating === 4 ||
                            averageRating === 5
                              ? `${averageRating}.0`
                              : averageRating
                          }
                        />
                      )}
                      <div>
                        <H5
                          title={
                            product.Reviews.length === 0
                              ? '0 reviews'
                              : `- ${product.Reviews.length} reviews`
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {product.Reviews.length !== 0 && (
                    <div>
                      {product.Reviews.slice(0, 2).map((review) => (
                        <Review
                          reviewTitle={review.headline}
                          reviewRating={`${review.rating}.0`}
                          reviewAuthor={`- ${review.author}`}
                          reviewContent={review.content}
                          key={review.id}
                        />
                      ))}
                    </div>
                  )}
                  <div className='show_review_readMore'>
                    <Link to={`/products/phones/${product.slug}/reviews`}>
                      {product.Reviews.length !== 0
                        ? 'Read More / Write A Review'
                        : 'Write A Review'}
                    </Link>
                    <FaChevronRight fill='#4870ff' size={14} />
                  </div>
                </div>
              </section>
            </span>
            <span className='show_right'>
              <section>
                <div className='show_title_desktop'>
                  <H2 title={product.CategoryTitle.toUpperCase()} />
                  <h1>
                    {product.title.toUpperCase()}
                    {userRole === 'ADMIN' && (
                      <span className='show_delete' onClick={deleteProduct}>
                        {' '}
                        - DELETE
                      </span>
                    )}
                  </h1>
                </div>
                <div className='show_info'>
                  <P text={product.description} />
                  <H3
                    title={
                      product.discount !== 0 ? (
                        <>
                          <div className='show_product_discount'>
                            <P text={`-${product.discount}%`} />
                          </div>
                          <span>
                            {`$${product.totalPrice}`}{' '}
                            <strike>{`$${product.price}`}</strike>
                          </span>
                        </>
                      ) : (
                        `$${product.totalPrice}`
                      )
                    }
                  />
                  <div className='show_info_sep'></div>
                  <div className='show_info_buttons'>
                    <Button
                      buttonTitle='ADD TO CART'
                      buttonClass='show_addToCart'
                      onClick={addToCart}
                    />
                    {isLogged ? (
                      !isFavorite ? (
                        <button
                          className='show_asideButtons'
                          onClick={addToFavorite}
                        >
                          <FaRegHeart size={'1.2rem'} fill='#4870ff' />
                        </button>
                      ) : (
                        <button
                          className='show_asideButtons'
                          onClick={removeProduct}
                        >
                          <FaHeart size={'1.2rem'} fill='#4870ff' />
                        </button>
                      )
                    ) : (
                      <button
                        className='show_asideButtons'
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'auto',
                          });
                          dispatch(openLogin());
                        }}
                      >
                        <FaRegHeart
                          size={window.innerWidth < 480 ? 18 : '1.2rem'}
                          fill='#4870ff'
                        />
                      </button>
                    )}
                    {userRole === 'ADMIN' && (
                      <button
                        className='show_asideButtons'
                        onClick={() => push(`/edit/${product.slug}`)}
                      >
                        <FaRegEdit size={18} fill='#4870ff' />
                      </button>
                    )}
                  </div>
                </div>
              </section>
              <section>
                <div className='show_specs'>
                  <div
                    className={
                      specsOpen
                        ? 'show_specs_wrapper_open'
                        : 'show_specs_wrapper'
                    }
                  >
                    <div className='show_specs_title'>
                      <H2 title='Specifications' />
                      <Img
                        imageSrc={specsOpen ? MinusImg : PlusImg}
                        imageAlt='Plus symbol'
                        onClick={() => setSpecsOpen(!specsOpen)}
                      />
                    </div>
                    <div className='show_specs_details_parent'>
                      <div className='show_specs_details_general'>
                        <H4 title={`SSD Capacity: ${product.ssdCapacity}`} />
                        <H4 title={`Operating System: ${product.os}`} />
                        <H4 title={`Brand: ${product.brand}`} />
                      </div>
                      <ShowSpecs
                        specsTitle='Display'
                        specsLine1={`Size: ${product.displaySize}`}
                        specsLine2={`aspectRatio: ${product.aspectRatio}`}
                        specsLine3={`Resolution: ${product.resolution} px`}
                      />
                      <ShowSpecs
                        specsTitle='Dimensions'
                        specsLine1={`Width: ${product.width}`}
                        specsLine2={`Height: ${product.height}`}
                        specsLine3={`Weight: ${product.weight}`}
                      />
                      <ShowSpecs
                        specsTitle='Battery'
                        specsLine1={`Battery Capacity: ${product.batteryCapacity}`}
                        specsLine2={`Charging Cable Type: ${product.cableType}`}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className='show_reviews'>
                  <div className='show_reviews_title'>
                    <H3 title='YOUR FEEDBACK' />
                    <H2 title='PRODUCT REVIEWS' />
                    <div className='show_reviews_rating'>
                      {averageRating !== 0 && (
                        <H4
                          title={
                            averageRating === 1 ||
                            averageRating === 2 ||
                            averageRating === 3 ||
                            averageRating === 4 ||
                            averageRating === 5
                              ? `${averageRating}.0`
                              : averageRating
                          }
                        />
                      )}
                      <div>
                        <H5
                          title={
                            product.Reviews.length === 0
                              ? '0 reviews'
                              : `- ${product.Reviews.length} reviews`
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {product.Reviews.length !== 0 && (
                    <div>
                      {product.Reviews.slice(0, 2).map((review) => (
                        <Review
                          reviewTitle={review.headline}
                          reviewRating={`${review.rating}.0`}
                          reviewAuthor={`- ${review.author}`}
                          reviewContent={review.content}
                          key={review.id}
                        />
                      ))}
                    </div>
                  )}
                  <div className='show_review_readMore'>
                    <Link to={`/products/phones/${product.slug}/reviews`}>
                      Read More / Write A Review
                    </Link>
                    <FaChevronRight fill='#4870ff' size={14} />
                  </div>
                </div>
              </section>
            </span>
          </div>
          <SimilarProducts />
        </>
      )}
    </>
  );
};

export default Show;
