import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft, FaStar, FaPencilAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// Styles
import './productReviews.scss';

// Assets
import PlusImg from '../../assets/svg/plus.svg';
import MinusImg from '../../assets/svg/minus.svg';

// Components
import Loading from '../../components/Loading/Loading';
import H2 from '../../components/HtmlTags/H2';
import Img from '../../components/HtmlTags/Img';
import H3 from '../../components/HtmlTags/H3';
import H4 from '../../components/HtmlTags/H4';
import H5 from '../../components/HtmlTags/H5';
import Form from '../../components/Forms/Form';
import ButtonImg from '../../components/Buttons/ButtonImg';
import Review from '../../components/Review/Review';
import NotFound from '../NotFound/NotFound';
import { openLogin } from '../../actions/menuType';

const ProductReviews = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [newReviewOpen, setNewReviewOpen] = useState(true);
  const userName = useSelector((state) => state.userName);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const { title } = useParams();
  const [averageRating, setAverageRating] = useState(Number);
  const [formValue, setFormValue] = useState({
    reviewHeadline: '',
    reviewContent: '',
  });
  const [stars, setStars] = useState({
    stars1: false,
    stars2: false,
    stars3: false,
    stars4: false,
    stars5: false,
  });

  // Loading
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    const fetchProduct = async () => {
      const res = await axios.get(`/products/show/${title}`);

      // Get the average rating
      if (res.data.product.Reviews[0]) {
        const ratingArray = res.data.product.Reviews;
        const ratingAverage = ratingArray.reduce((a, b) => ({
          rating: a.rating + b.rating,
        }));
        const averageRating = ratingAverage.rating / ratingArray.length;

        setAverageRating(averageRating);
      } else {
        setAverageRating(0);
      }

      setProduct(res.data.product);
      setLoading(false);
    };

    fetchProduct(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  const addReview = async () => {
    // Get the length of stars that are selected
    const rating = Object.keys(stars).filter(
      (key) => stars[key] === true
    ).length;

    const res = await axios.post('/products/add-review', {
      reviewHeadline: formValue.reviewHeadline,
      reviewContent: formValue.reviewContent,
      reviewRating: rating,
      productSlug: title,
    });

    if (res.data.status === 200) {
      setProduct({
        ...product,
        Reviews: [
          ...product.Reviews,
          {
            headline: formValue.reviewHeadline,
            rating: rating,
            author: userName,
            content: formValue.reviewContent,
            id: uuid(),
          },
        ],
      });

      setFormValue({ ...formValue, reviewHeadline: '', reviewContent: '' });
      setStars({
        ...stars,
        stars1: false,
        stars2: false,
        stars3: false,
        stars4: false,
        stars5: false,
      });
    }
  };

  const handleOnChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const notLogged = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    dispatch(openLogin());
  };

  return (
    <>
      {!product ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            {/* Head */}
            <Helmet>
              <title>Sweath: {product.title} - Reviews</title>
            </Helmet>
          </HelmetProvider>
          {/* Body */}
          <header>
            <nav>
              <div className='nav_productReviews'>
                <Link to={`/product/${product.slug}`}>
                  <FaChevronLeft size={17} />
                  <Img
                    imageSrc={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                    imageAlt={product.title}
                  />
                  <H3 title={product.title} />
                </Link>
              </div>
            </nav>
          </header>
          <section>
            <div className='productReviews'>
              <h1>{product.title} - REVIEWS</h1>
              <div className='productReviews_rating'>
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
                {averageRating === 0 ? (
                  <span style={{ marginLeft: '-0.73rem' }}>
                    <H5 title={`${product.Reviews.length} Reviews`} />
                  </span>
                ) : (
                  <span>
                    <H5 title={`- ${product.Reviews.length} Reviews`} />
                  </span>
                )}
              </div>
            </div>
            <div className='productReviews_new'>
              <div
                className={
                  !newReviewOpen
                    ? 'productReviews_new_wrapper'
                    : 'productReviews_new_wrapper productReviews_new_wrapper_open'
                }
              >
                <div className='productReviews_new_title'>
                  <H2 title='Leave A Review' />
                  <Img
                    imageSrc={newReviewOpen ? MinusImg : PlusImg}
                    imageAlt='Plus icon'
                    onClick={() => setNewReviewOpen(!newReviewOpen)}
                  />
                </div>
                <div>
                  <Form
                    formType='text'
                    formName='reviewHeadline'
                    formPlaceholder='Headline'
                    onChange={handleOnChange}
                    formValue={formValue.reviewHeadline}
                  />
                </div>
                <div>
                  <textarea
                    name='reviewContent'
                    cols='30'
                    rows='10'
                    placeholder='Content'
                    onChange={handleOnChange}
                    value={formValue.reviewContent}
                  ></textarea>
                </div>
                <div className='productReviews_new_rating'>
                  <H4 title='Overall Rating:' />
                  <FaStar
                    fill={!stars.stars1 ? '#cbcbcb' : '#9eacff'}
                    size={22}
                    onClick={() =>
                      !stars.stars1
                        ? setStars({
                            ...stars,
                            stars1: true,
                          })
                        : setStars({
                            ...stars,
                            stars2: false,
                            stars3: false,
                            stars4: false,
                            stars5: false,
                          })
                    }
                  />
                  <FaStar
                    fill={!stars.stars2 ? '#cbcbcb' : '#9eacff'}
                    size={22}
                    onClick={() =>
                      !stars.stars2
                        ? setStars({
                            ...stars,
                            stars1: true,
                            stars2: true,
                          })
                        : setStars({
                            ...stars,
                            stars3: false,
                            stars4: false,
                            stars5: false,
                          })
                    }
                  />
                  <FaStar
                    fill={!stars.stars3 ? '#cbcbcb' : '#9eacff'}
                    size={22}
                    onClick={() =>
                      !stars.stars3
                        ? setStars({
                            ...stars,
                            stars1: true,
                            stars2: true,
                            stars3: true,
                          })
                        : setStars({ ...stars, stars4: false, stars5: false })
                    }
                  />
                  <FaStar
                    fill={!stars.stars4 ? '#cbcbcb' : '#9eacff'}
                    size={22}
                    onClick={() =>
                      !stars.stars4
                        ? setStars({
                            ...stars,
                            stars1: true,
                            stars2: true,
                            stars3: true,
                            stars4: true,
                          })
                        : setStars({ ...stars, stars5: false })
                    }
                  />
                  <FaStar
                    fill={!stars.stars5 ? '#cbcbcb' : '#9eacff'}
                    size={22}
                    onClick={() =>
                      !stars.stars5 &&
                      setStars({
                        ...stars,
                        stars1: true,
                        stars2: true,
                        stars3: true,
                        stars4: true,
                        stars5: true,
                      })
                    }
                  />
                </div>
                <ButtonImg
                  buttonTitle='SUBMIT REVIEW'
                  buttonImg={<FaPencilAlt />}
                  buttonImgLeft={true}
                  onClick={!isLogged ? notLogged : addReview}
                />
              </div>
            </div>
          </section>
          <section>
            <div className='productReviews_reviews'>
              {product.Reviews.length === 0 ? (
                <H4 title="This product doesn't have any reviews" />
              ) : (
                product.Reviews.map((review) => (
                  <Review
                    reviewTitle={review.headline}
                    reviewRating={`${review.rating}.0`}
                    reviewAuthor={`- ${review.author}`}
                    reviewContent={review.content}
                    key={review.id}
                  />
                ))
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductReviews;
