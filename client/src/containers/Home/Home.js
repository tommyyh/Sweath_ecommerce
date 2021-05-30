import React, { useState, useRef, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

// Styles
import './index.scss';

// Assets
import HomeImgMobile from '../../assets/img/home-img-mobile.png';
import PriceIcon from '../../assets/svg/price.svg';
import CustomerServiceIcon from '../../assets/svg/service.svg';
import ReviewIcon from '../../assets/svg/review.svg';
import ReviewImg from '../../assets/img/review-img-desktop.png';
import HomeImgDesktop from '../../assets/img/home-img-desktop.png';

// Components
import P from '../../components/HtmlTags/P';
import Img from '../../components/HtmlTags/Img';
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import Button from '../../components/Buttons/Button';
import Whyus from './components/Whyus';
import PopularProduct from './components/PopularProduct';
import Review from './components/Review';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const [reviewCounter, setReviewCounter] = useState(1);
  const reviews = useRef(); // Reviews - carousel
  const trendingRef = useRef();
  const [loading, setLoading] = useState(true);
  const { push } = useHistory();
  const mobileScreen = useMediaQuery({ query: '(max-device-width: 480px)' });
  const [trending, setTrending] = useState([]);

  // Set loading before page loads
  useEffect(() => {
    setLoading(true);

    const fetchTrending = async () => {
      const res = await axios.get('/products/trending');

      setTrending(res.data.products);
      setLoading(false);
    };

    fetchTrending();
  }, []);

  if (loading) return <Loading />;

  const reviewsNext = () => {
    if (reviewCounter !== 4) {
      if (window.innerWidth > 1025) {
        reviews.current.children[0].style.marginLeft = `${
          -100 * reviewCounter
        }vw`;
      } else {
        reviews.current.children[0].style.marginLeft = `${
          -106.5 * reviewCounter
        }vw`;
      }

      setReviewCounter((reviewCounter) => reviewCounter + 1);
    }
  };

  const reviewsPrev = () => {
    if (reviewCounter !== 1) {
      if (window.innerWidth > 1025) {
        reviews.current.children[0].style.marginLeft = `${
          -100 * (reviewCounter - 2)
        }vw`;
      } else {
        reviews.current.children[0].style.marginLeft = `${
          -106.5 * (reviewCounter - 2)
        }vw`;
      }

      setReviewCounter((reviewCounter) => reviewCounter - 1);
    }
  };

  // Remove id from url when an a tag is clicked
  const urlRemoveId = () => {
    setTimeout(() => {
      window.history.replaceState('Sweath home page', null, '/');
    }, 0.001);
  };

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: E-Shop - Technology & Electronics</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <main>
        <div className='lp_home'>
          <h1>
            <span>ELECTRONICS </span>
            <span>& TECH ACCESSIBLE FOR LOW PRICES</span>
          </h1>
          <P text='Sweath is an online e-commerce store that sells good quality electronics, technology and other products for low prices.' />
          <Button
            buttonTitle='TRENDING NOW'
            onClick={() => {
              trendingRef.current.scrollIntoView();
            }}
          />
        </div>
      </main>
      <Img
        imageSrc={HomeImgMobile}
        imageAlt='Laptop background'
        imageClass='lp_img'
      />
      <Img
        imageSrc={HomeImgDesktop}
        imageAlt='Laptop background'
        imageClass='lp_img_desktop'
      />
      <section>
        <div className='whyus'>
          <H2 title='WHY US?' />
          <div className='whyus_seperator'></div>
          <span>
            <Whyus
              whyusClass='whyus_price'
              whyusTitle='Amazing Prices & Quality'
              whyusText='Shop electronics and technology for low prices. For a 10% discount, use the promo code "10OFF" at checkout.'
              whyusImg={PriceIcon}
              whyusLink='View Trending'
              whyusPath='/'
              scrollDown={true}
              scrollFunction={urlRemoveId}
              scrollId='#trending'
            />
            <Whyus
              whyusClass='whyus_customer_service'
              whyusTitle='Great Customer Service'
              whyusText='Customer satisfaction is our number one priority and we want to make contacting us accessible for anyone.'
              whyusImg={CustomerServiceIcon}
              whyusLink='Contact Us'
              whyusPath='/contact-us'
              scrollDown={false}
            />
            <Whyus
              whyusClass='whyus_satisfied_customers'
              whyusTitle='Satisfied Customers'
              whyusText='Many of our customers are satisfied with our service and their purchases. Feel free to check their reviews.'
              whyusImg={ReviewIcon}
              whyusLink='Our Reviews'
              whyusPath='/'
              scrollId='#reviews'
              scrollDown={true}
              scrollFunction={urlRemoveId}
            />
          </span>
        </div>
      </section>
      <section>
        <div className='trending' id='#trending' ref={trendingRef}>
          <H3 title='MOST POPULAR' />
          <H2 title='TRENDING NOW' />
          <div className='trending_product_section'>
            {!trending ? (
              <h3>No proucts added</h3>
            ) : (
              trending.map((product) => (
                <Link to={`/product/${product.slug}`} key={product.id}>
                  <PopularProduct
                    productTitle={product.title}
                    productPrice={`$${product.totalPrice}`}
                    productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                    productImgAlt={product.title}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      <section>
        <div className='reviews' id='reviews'>
          <div className='reviews_title'>
            <H3 title='YOUR FEEDBACK' />
            <H2 title='OUR REVIEWS' />
          </div>
          <FaChevronLeft
            className={
              reviewCounter !== 1
                ? 'review_arrow_left'
                : 'review_arrow_left_disabled'
            }
            size={!mobileScreen ? '2.98rem' : 38}
            onClick={reviewsPrev}
          />
          <FaChevronRight
            className={
              reviewCounter !== 4
                ? 'review_arrow_right'
                : 'review_arrow_right_disabled'
            }
            size={!mobileScreen ? '2.98rem' : 38}
            onClick={reviewsNext}
          />
          <div className='all_reviews' ref={reviews}>
            <Review
              image={ReviewImg}
              imageAlt='Reviewer photo'
              authorName='James Williams'
              authorStatus='Customer'
              reviewText='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eum earum unde doloremque, at quisquam? Lorem ipsum dolor. Lorem ipsum dolor, sit amet consectetur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              reviewRating='5.0'
            />
            <Review
              image={ReviewImg}
              imageAlt='Reviewer photo'
              authorName='Michael Jones'
              authorStatus='Customer'
              reviewText='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eum earum unde doloremque, at quisquam? Lorem ipsum dolor. Lorem ipsum dolor, sit amet consectetur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              reviewRating='4.5'
            />
            <Review
              image={ReviewImg}
              imageAlt='Reviewer photo'
              authorName='Thomas Lewis'
              authorStatus='Customer'
              reviewText='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eum earum unde doloremque, at quisquam? Lorem ipsum dolor. Lorem ipsum dolor, sit amet consectetur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              reviewRating='5.0'
            />
            <Review
              image={ReviewImg}
              imageAlt='Reviewer photo'
              authorName='Daniel Nelson'
              authorStatus='Customer'
              reviewText='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eum earum unde doloremque, at quisquam? Lorem ipsum dolor. Lorem ipsum dolor, sit amet consectetur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              reviewRating='5.0'
            />
          </div>
        </div>
      </section>
      <section>
        <div className='contact'>
          <span>
            <H3 title="LET'S TALK!" />
            <H2 title='HAVE ANY QUESTIONS?' />
          </span>
          <div className='contact_text'>
            <div className='contact_rect'></div>
            <div className='contact_text_content'>
              <P text='If you want to make a complaint, get a refund, ask a question, make collaborations, or just want to message us, make sure to contact us through our form or email us at help@sweath.com' />
              <Button
                buttonTitle='CONTACT US'
                onClick={() => push('/contact-us')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
