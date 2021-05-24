import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCaretUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Styles
import './header.scss';

// Assets
import logo from '../../assets/svg/logo.svg';
import shoppingBag from '../../assets/svg/bag.svg';
import searchIcon from '../../assets/svg/search.svg';
import shoppingBagWhite from '../../assets/svg/bagWhite.svg';
import searchIconWhite from '../../assets/svg/searchWhite.svg';

// Actions
import { openLogin, closeLogin } from '../../actions/menuType';
import { signIn, logout } from '../../actions/isLogged';
import { setName, setRole, setEmail } from '../../actions/userName';

// Components
import NavIcons from './components/NavIcons';
import Menu from './components/Menu';
import Burger from './components/Burger';
import SearchMenu from './components/SearchMenu';
import H2 from '../HtmlTags/H2';
import Img from '../HtmlTags/Img';
import Li from '../HtmlTags/Li';
import Ul from '../HtmlTags/Ul';
import UserMenu from './components/UserMenu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [changeOnScroll, setChangeOnScroll] = useState(
    window.location.pathname === '/' || window.location.pathname === '/#reviews'
      ? true
      : false
  );
  const userMenuType = useSelector((state) => state.userMenu);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const history = useHistory();
  const { push } = useHistory();

  // If menu is open -> lock scrolling
  if (menuOpen || searchOpen || userMenuType !== '') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'initial';
  }

  // Check if token exists -> user is logged in
  useEffect(() => {
    const authUser = async () => {
      const res = await axios.get('/user/auth');

      if (res.data.status === 200) {
        dispatch(signIn());
        dispatch(setName(res.data.name));
        dispatch(setRole(res.data.role));
        dispatch(setEmail(res.data.email));
      }

      if (res.data.status === 400) {
        // Delete cookies
        await axios.delete('/user/logout', {
          withCredentials: true,
        });

        dispatch(logout());
        dispatch(setName(''));
        dispatch(setRole('CUSTOMER'));
        dispatch(setEmail(''));
      }
    };

    authUser();
  });

  // Logout
  const userLogout = async () => {
    // Delete cookies
    await axios.delete('/user/logout', {
      withCredentials: true,
    });

    if (
      window.location.pathname === '/cart' ||
      window.location.pathname === '/checkout/shipping-information' ||
      window.location.pathname === '/checkout/payment'
    ) {
      push('/');
    }

    // Logout from redux
    dispatch(logout());
    dispatch(setName(''));
    dispatch(setRole('CUSTOMER'));
  };

  // If home page -> transparent nav
  history.listen(() => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/#reviews'
    ) {
      setChangeOnScroll(true);
    } else {
      setChangeOnScroll(false);
    }

    setMenuOpen(false);
    setSearchOpen(false);
  });

  return (
    <header>
      <nav>
        <div className={!changeOnScroll ? 'nav' : 'nav nav_trans'}>
          <div className='nav_menu' onClick={() => setMenuOpen(!menuOpen)}>
            <Burger />
          </div>
          <div className='nav_title'>
            <H2 title={<Link to='/'>Sweath</Link>} />
            <Img imageSrc={logo} imageAlt='Sweath logo' />
          </div>
          <div className='nav_icons'>
            <NavIcons
              linkIcon={changeOnScroll ? searchIconWhite : searchIcon}
              linkIconAlt='Search icon'
              iconClass='search_icon'
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
            />
            <NavIcons
              linkIcon={changeOnScroll ? shoppingBagWhite : shoppingBag}
              linkIconAlt='Bag icon'
              iconClass='bag_icon'
              iconLinkPath='/cart'
            />
          </div>
        </div>
        {/* Desktop nav bar */}
        <div
          className={
            !changeOnScroll ? 'nav_desktop' : 'nav_desktop nav_trans_desktop'
          }
        >
          <div className='nav_title_desktop'>
            <H2 title={<Link to='/'>Sweath</Link>} />
            <Img imageSrc={logo} imageAlt='Sweath logo' />
          </div>
          <div className='nav_links_desktop'>
            <Ul
              listChildren={
                <>
                  <span>
                    <Li text={'Products'} tagClass='nav_link_desktop' />
                    <div className='nav_dropdown'>
                      <FaCaretUp size={'2rem'} fill='#fff' />
                      <Ul
                        listChildren={
                          <>
                            <Link to='/category/smartphones'>
                              <Li text='Smartphones' />
                            </Link>
                            <Link to='/category/school-laptops'>
                              <Li text='School Laptops' />
                            </Link>
                            <Link to='/category/gaming-laptops'>
                              <Li text='Gaming Laptops' />
                            </Link>
                            <Link to='/category/tablets'>
                              <Li text='Tablets' />
                            </Link>
                          </>
                        }
                      />
                    </div>
                  </span>
                  <span>
                    <Li text='Sales' tagClass='nav_link_desktop' />
                    <div className='nav_dropdown nav_dropdown2'>
                      <FaCaretUp size={'2rem'} fill='#fff' />
                      <Ul
                        listChildren={
                          <>
                            <Link to='/sale/smartphones'>
                              <Li text='Smartphones' />
                            </Link>
                            <Link to='/sale/school-laptops'>
                              <Li text='School Laptops' />
                            </Link>
                            <Link to='/sale/gaming-laptops'>
                              <Li text='Gaming Laptops' />
                            </Link>
                            <Link to='/sale/tablets'>
                              <Li text='Tablets' />
                            </Link>
                          </>
                        }
                      />
                    </div>
                  </span>
                  <span>
                    <Li text='Account' tagClass='nav_link_desktop' />
                    <div className='nav_dropdown nav_dropdown3'>
                      <FaCaretUp size={40} fill='#fff' />
                      <Ul
                        listChildren={
                          <>
                            <Link to='/my-account'>
                              <Li text='My Account' />
                            </Link>
                            <Link to='/favorite'>
                              <Li text='Favorite' />
                            </Link>
                            <Link to='/my-account/orders'>
                              <Li text='Order History' />
                            </Link>
                            {!isLogged ? (
                              <Link
                                to='#'
                                onClick={() => dispatch(openLogin())}
                              >
                                <Li text='Login' />
                              </Link>
                            ) : (
                              <Link to='#' onClick={userLogout}>
                                <Li text='Logout' />
                              </Link>
                            )}
                          </>
                        }
                      />
                    </div>
                  </span>
                  <span>
                    <Li
                      text={<Link to='/contact-us'>Contact Us</Link>}
                      tagClass='nav_link_desktop'
                    />
                  </span>
                </>
              }
            />
          </div>
          <div className='nav_icons_desktop'>
            <NavIcons
              linkIcon={changeOnScroll ? searchIconWhite : searchIcon}
              linkIconAlt='Search icon'
              iconClass='search_icon_desktop'
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
            />
            <NavIcons
              linkIcon={changeOnScroll ? shoppingBagWhite : shoppingBag}
              linkIconAlt='Bag icon'
              iconClass='bag_icon_desktop'
              iconLinkPath='/cart'
            />
          </div>
        </div>
      </nav>
      <div
        className={
          searchOpen || userMenuType !== ''
            ? 'background_desktop'
            : 'background_desktop background_desktop_closed'
        }
      ></div>
      <Menu
        menuClass={menuOpen && userMenuType === '' ? 'menu_open' : 'menu'}
        menuState={menuOpen}
        setMenuState={setMenuOpen}
        backgroundBlur={
          menuOpen || userMenuType !== ''
            ? 'backgroundBlur'
            : 'backgroundBlurOff'
        }
        isLogged={isLogged}
        userLogout={userLogout}
      />
      <SearchMenu
        searchMenuClass={searchOpen ? 'search_menu' : 'search_menu_closed'}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      <UserMenu
        menuType={userMenuType}
        closeMenu={() => dispatch(closeLogin())}
      />
    </header>
  );
};

export default Header;
