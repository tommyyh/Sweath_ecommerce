import React, { useState, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Styles
import './accountDropdown.scss';

import Dropdown from './Components/Dropdown';
import DropdownItem from './Components/DropdownItem';
import H4 from '../HtmlTags/H4';
import H5 from '../HtmlTags/H5';
import Loading from '../Loading/Loading';

const AccountDropdown = ({ dropdownClass }) => {
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [filter] = useState({
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
    const fetchData = async () => {
      const res1 = await axios.get('/user/orders/dropdown');
      const res2 = await axios.get('/shopping-cart/dropdown');
      const res3 = await axios.post('/products/favorite-products', filter);

      setOrders(res1.data.orders);
      setCartProducts(res2.data.cart);
      setFavorite(res3.data.favorite);
      setLoading(false);
    };

    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <section className='account_dropdown_wrapper'>
      <div className={dropdownClass}>
        {!orders ? (
          <Dropdown
            dropdownClass='account_orders_0'
            dropdownTitle={`Order History (0)`}
            dropdownOpen={ordersOpen}
            setDropdownOpen={() => {
              setOrdersOpen(!ordersOpen);
              setFavoriteOpen(false);
              setCartOpen(false);
            }}
            dropdownContent={
              <div className='account_orders_list'>
                <H5 title="You don't have any orders" />
              </div>
            }
          />
        ) : (
          <Dropdown
            dropdownClass={
              orders.length === 1 ? 'account_orders_1' : 'account_orders'
            }
            dropdownTitle={`Order History (${orders.length})`}
            dropdownOpen={ordersOpen}
            setDropdownOpen={() => {
              setOrdersOpen(!ordersOpen);
              setFavoriteOpen(false);
              setCartOpen(false);
            }}
            dropdownContent={
              <div className='account_orders_list'>
                {orders.map((order) => (
                  <Link
                    to={`/my-account/order/${order.id}`}
                    key={order.id}
                    className='account_orders_list_link'
                  >
                    <H4 title={order.id} />
                  </Link>
                ))}
                <span>
                  <Link to='/my-account/orders'>View More</Link>
                  <FaChevronRight fill='#4870ff' size={13} />
                </span>
              </div>
            }
          />
        )}
        {favorite.length === 0 ? (
          <Dropdown
            dropdownClass='account_favorite_0'
            dropdownTitle={`Favorite (0)`}
            dropdownOpen={favoriteOpen}
            setDropdownOpen={() => {
              setCartOpen(false);
              setOrdersOpen(false);
              setFavoriteOpen(!favoriteOpen);
            }}
            dropdownContent={
              <div className='account_favorite_list'>
                <H5 title="You don't have any favorite products." />
              </div>
            }
          />
        ) : (
          <Dropdown
            dropdownClass={
              favorite.length === 1 ? 'account_favorite_1' : 'account_favorite'
            }
            dropdownTitle={`Favorite (${favorite.length})`}
            dropdownOpen={favoriteOpen}
            setDropdownOpen={() => {
              setCartOpen(false);
              setOrdersOpen(false);
              setFavoriteOpen(!favoriteOpen);
            }}
            dropdownContent={
              <div className='account_favorite_list'>
                {favorite.map((favoriteProduct) => (
                  <DropdownItem
                    itemImg={favoriteProduct.image1}
                    itemGroup='favorite'
                    itemTitle={`${favoriteProduct.title}`}
                    itemPrice={`$${favoriteProduct.totalPrice}`}
                    itemAvailable='Available'
                    key={favoriteProduct.id}
                    itemLink={favoriteProduct.slug}
                  />
                ))}
                <span>
                  <Link to='/favorite'>View More</Link>
                  <FaChevronRight fill='#4870ff' size={13} />
                </span>
              </div>
            }
          />
        )}
        {cartProducts.cartProducts.length === 0 ? (
          <Dropdown
            dropdownClass='account_cart_0'
            dropdownTitle={`My Shopping Cart (0)`}
            dropdownOpen={cartOpen}
            setDropdownOpen={() => {
              setCartOpen(!cartOpen);
              setOrdersOpen(false);
              setFavoriteOpen(false);
            }}
            dropdownContent={
              <div className='account_cart_list'>
                <H5 title='You have 0 items in your cart' />
              </div>
            }
          />
        ) : (
          <Dropdown
            dropdownClass={
              cartProducts.cartProducts.length === 1
                ? 'account_cart_1'
                : 'account_cart'
            }
            dropdownTitle={`My Shopping Cart (${cartProducts.cartProducts.length})`}
            dropdownOpen={cartOpen}
            setDropdownOpen={() => {
              setCartOpen(!cartOpen);
              setOrdersOpen(false);
              setFavoriteOpen(false);
            }}
            dropdownContent={
              <div className='account_cart_list'>
                {cartProducts.cartProducts.map((cartProduct) => (
                  <DropdownItem
                    itemImg={cartProduct.image1}
                    itemTitle={`${cartProduct.title} (${cartProduct.quantity})`}
                    itemGroup={'cart'}
                    itemPrice={`$${cartProduct.totalPrice}`}
                    itemAvailable='Available'
                    itemLink={cartProduct.slug}
                    key={cartProduct.id}
                  />
                ))}
                <span>
                  <Link to='/cart'>View More</Link>
                  <FaChevronRight fill='#4870ff' size={13} />
                </span>
              </div>
            }
          />
        )}
      </div>
    </section>
  );
};

export default AccountDropdown;
