import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
              <MenuItems title='Accessories' setActiveMenu={setActiveMenu} />
              <MenuItems title='Sale' setActiveMenu={setActiveMenu} />
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
        innerLinkTitle1='Laptops'
        innerLinkTitle2='Phones'
        innerLinkTitle3='Lorem'
        innerLinkTitle4='Ipsum'
      />
      <InnerMenu
        activeMenu={activeMenu}
        activeMenuClass={
          activeMenu === 'Accessories'
            ? 'inner_menu_accessories'
            : 'inner_menu_accessories_closed'
        }
        title='Accessories'
        closeInnerMenu={setActiveMenu}
        innerLinkTitle1='Dolor'
        innerLinkTitle2='Consectetur'
        innerLinkTitle3='Molestiae'
        innerLinkTitle4='Maxime'
      />
      <InnerMenu
        activeMenu={activeMenu}
        activeMenuClass={
          activeMenu === 'Sale' ? 'inner_menu_sale' : 'inner_menu_sale_closed'
        }
        title='Sale'
        closeInnerMenu={setActiveMenu}
        innerLinkTitle1='Neque'
        innerLinkTitle2='Consectetur'
        innerLinkTitle3='Veniam'
        innerLinkTitle4='Similique'
      />
    </>
  );
};

export default Menu;
