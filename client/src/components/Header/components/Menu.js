import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import MenuItems from './MenuItems';
import Button from '../../Buttons/Button';
import InnerMenu from './InnerMenu';
import H2 from '../../HtmlTags/H2';
import P from '../../HtmlTags/P';
import Ul from '../../HtmlTags/Ul';
import { openLogin, openRegister } from '../../../actions/menuType';

// Assets
import userIcon from '../../../assets/svg/logo.svg';

const Menu = ({
  menuClass,
  menuState,
  setMenuState,
  backgroundBlur,
  isLogged,
  userLogout,
}) => {
  const [activeMenu, setActiveMenu] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // Close inner menu on route change
  history.listen(() => {
    setActiveMenu('');
  });

  return (
    <>
      <div className={menuClass}>
        <div className='menu_nav'>
          <div className='menu_title'>
            <Link to='/'>
              <H2 title='Sweath' />
            </Link>
            <img src={userIcon} alt='Sweath icon' />
          </div>
          <div
            className='menu_burger_open'
            onClick={() => setMenuState(!menuState)}
          >
            <div className='menu_burger_line'></div>
          </div>
        </div>
        <div className='seperator_line'></div>
        <Ul
          tagClass='menu_list'
          listChildren={
            <>
              <MenuItems title='Products' setActiveMenu={setActiveMenu} />
              <MenuItems title='Sales' setActiveMenu={setActiveMenu} />
              <MenuItems title='Account' setActiveMenu={setActiveMenu} />
              <MenuItems title='Contact Us' path='/contact-us' />
            </>
          }
        />
        <div className='menu_user'>
          <P
            text='Become a Sweath member for the best products, benefits and
            inspiration.'
          />
          <div className='menu_btn'>
            {!isLogged ? (
              <>
                <Button
                  buttonTitle='LOGIN'
                  buttonClass='btn login'
                  onClick={() => dispatch(openLogin())}
                />
                <Button
                  buttonTitle='REGISTER'
                  buttonClass='btn register'
                  onClick={() => dispatch(openRegister())}
                />
              </>
            ) : (
              <Button
                buttonTitle='LOGOUT'
                buttonClass='btn logout'
                onClick={userLogout}
              />
            )}
          </div>
        </div>
      </div>
      <div className={backgroundBlur}></div>
      <InnerMenu
        activeMenu={activeMenu}
        activeMenuClass={
          activeMenu === 'Products'
            ? 'inner_menu_products'
            : 'inner_menu_products_closed'
        }
        title='Products'
        closeInnerMenu={setActiveMenu}
        innerLinkTitle1='Smartphones'
        innerLinkTitle2='Ultrabooks'
        innerLinkTitle3='Televisions'
        innerLinkTitle4='Tablets'
      />
      <InnerMenu
        activeMenu={activeMenu}
        activeMenuClass={
          activeMenu === 'Sales'
            ? 'inner_menu_sales'
            : 'inner_menu_sales_closed'
        }
        title='Sales'
        closeInnerMenu={setActiveMenu}
        innerLinkTitle1='Smartphones'
        innerLinkTitle2='Ultrabooks'
        innerLinkTitle3='Televisions'
        innerLinkTitle4='Tablets'
      />
      <div
        className={
          activeMenu === 'Account'
            ? 'inner_menu_account'
            : 'inner_menu_account_closed'
        }
      >
        <div className='go_back' onClick={() => setActiveMenu('')}>
          <FaChevronLeft />
          <h3>All</h3>
        </div>
        <H2 title='Account' />
        <Ul
          listChildren={
            <>
              <li>
                <Link to='/my-account'>My account</Link>
              </li>
              <li>
                <Link to='/favorite'>Favorite</Link>
              </li>
              <li>
                <Link to='/my-account/orders'>Order History</Link>
              </li>
            </>
          }
        />
      </div>
    </>
  );
};

export default Menu;
