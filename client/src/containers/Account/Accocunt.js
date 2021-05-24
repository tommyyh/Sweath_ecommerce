import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

// Styles
import './account.scss';

// Components
import Loading from '../../components/Loading/Loading';
import H2 from '../../components/HtmlTags/H2';
import H4 from '../../components/HtmlTags/H4';
import SimilarProducts from '../../components/SimilarProducts/SimilarProducts';
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const Account = () => {
  const [loading, setLoading] = useState(true);
  const mobileAndTabletScreen = useMediaQuery({
    query: '(max-device-width: 1024px)',
  });
  const desktopScreen = useMediaQuery({ query: '(min-device-width: 1025px)' });
  const userName = useSelector((state) => state.userName);
  const userRole = useSelector((state) => state.userRole);

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
          <title>Sweath: My Account</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <div className='account_wrapper'>
        {desktopScreen && <AccountDropdown dropdownClass='account_dropdown' />}
        <main>
          <div className='account'>
            <span>
              <H2 title='MY ACCOUNT' />
              <h1>{userName.toUpperCase()}</h1>
              <H4 title='Member since: 15/02/2019' />
            </span>
            {userRole === 'ADMIN' && (
              <div className='admin_link'>
                <Link to='/admin'>Admin Panel</Link>
                <FaChevronRight fill='#4870ff' size={14} />
              </div>
            )}
          </div>
        </main>
      </div>
      {mobileAndTabletScreen && (
        <AccountDropdown dropdownClass='account_dropdown' />
      )}
      <SimilarProducts />
    </>
  );
};

export default Account;
