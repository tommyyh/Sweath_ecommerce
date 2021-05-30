import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Styles
import './loginPrompt.scss';

// Components
import Loading from '../../components/Loading/Loading';
import { openLogin } from '../../actions/menuType';

const LoginPrompt = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
          <title>Sweath: Login</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <main>
        <div className='loginPrompt'>
          <h1>
            Please <span onClick={() => dispatch(openLogin())}>log in</span> to
            access this page or <Link to='/'>go back</Link>.
          </h1>
        </div>
      </main>
    </>
  );
};

export default LoginPrompt;
