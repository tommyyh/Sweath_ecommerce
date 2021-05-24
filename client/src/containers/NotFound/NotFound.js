import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

// Styles
import './notFound.scss';

// Components
import Loading from '../../components/Loading/Loading';
import SimilarProducts from '../../components/SimilarProducts/SimilarProducts';

const Finish = () => {
  const [loading, setLoading] = useState(true);

  // Loading
  useEffect(() => {
    setLoading(false);

    // Always start at the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Page Not Found</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <main>
        <div className='notFound'>
          <h1>
            <span>The page you’re </span>
            <span>looking for cannot be found</span>
          </h1>
          <div className='notFound_goBack'>
            <FaChevronLeft fill='#4870ff' size={14} />
            <Link to='/'>Go Back Home</Link>
          </div>
        </div>
      </main>
      <SimilarProducts />
    </>
  );
};

export default Finish;
