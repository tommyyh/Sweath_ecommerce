import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { allowCheckout } from '../../actions/allowCheckout';

// Styles
import './cart.scss';

// Components
import SimilarProducts from '../../components/SimilarProducts/SimilarProducts';
import Loading from '../../components/Loading/Loading';
import CartItem from './Components/CartItem';
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import H4 from '../../components/HtmlTags/H4';
import Form from '../../components/Forms/Form';
import Button from '../../components/Buttons/Button';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [coupon, setCoupon] = useState('');
  const { push } = useHistory();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);

  // Set loading before page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    setLoading(true);

    const fetchCart = async () => {
      const res = await axios.get('/shopping-cart');

      setCart(res.data.cart);
    };

    fetchCart();
    setLoading(false);
  }, []);

  // Remove from cart
  const removeProduct = async (productSlug) => {
    const res = await axios.delete(`/shopping-cart/delete/${productSlug}`);
    const product = isLogged
      ? cart.cartProducts.find((product) => product.slug === productSlug)
      : cart.cartProducts.find(
          (product) => product.product.slug === productSlug
        );
    const subTotal = isLogged
      ? cart.subTotal - product.totalPrice
      : cart.subTotal - product.price;

    if (res.data.status === 200) {
      isLogged
        ? setCart({
            ...cart,
            cartProducts: cart.cartProducts.filter(
              (product) => product.slug !== productSlug
            ),
            subTotal: subTotal,
            totalPrice: subTotal - (subTotal / 100) * cart.discount,
          })
        : setCart({
            ...cart,
            cartProducts: cart.cartProducts.filter(
              (product) => product.product.slug !== productSlug
            ),
            subTotal: subTotal,
            totalPrice: subTotal - (subTotal / 100) * cart.discount,
          });
    }
  };

  // Update quantity
  const updateQuantity = async (productSlug, productQuantity) => {
    const res = await axios.put(
      `/shopping-cart/update-quantity/${productSlug}`,
      {
        productQuantity,
      }
    );
    const product = isLogged
      ? cart.cartProducts.find((product) => product.slug === productSlug)
      : cart.cartProducts.find(
          (product) => product.product.slug === productSlug
        );
    const subTotalCalc = isLogged
      ? (cart.subTotal +=
          product.discountedPrice * (productQuantity - product.quantity))
      : (cart.subTotal +=
          product.product.totalPrice * (productQuantity - product.quantity));

    if (res.data.status === 200) {
      isLogged
        ? setCart({
            ...cart,
            cartProducts: cart.cartProducts.map((product) =>
              product.slug === productSlug
                ? {
                    ...product,
                    quantity: productQuantity,
                    totalPrice: productQuantity * product.discountedPrice,
                    defualtPrice: productQuantity * product.price,
                  }
                : product
            ),
            subTotal: subTotalCalc,
            totalPrice: subTotalCalc - (subTotalCalc / 100) * cart.discount,
          })
        : setCart({
            ...cart,
            cartProducts: cart.cartProducts.map((product) =>
              product.product.slug === productSlug
                ? {
                    ...product,
                    quantity: productQuantity,
                    price: productQuantity * product.product.totalPrice,
                    defualtPrice: productQuantity * product.product.price,
                  }
                : product
            ),
            subTotal: subTotalCalc,
            totalPrice: subTotalCalc - (subTotalCalc / 100) * cart.discount,
          });
    }
  };

  // Add coupon
  const addCoupon = async () => {
    const res = await axios.post('/shopping-cart/add-coupon', {
      couponTitle: coupon,
    });

    if (res.data.status === 200) {
      setCart({
        ...cart,
        discountTitle: res.data.coupon.title,
        discount: res.data.coupon.discount,
        totalPrice:
          cart.subTotal - (cart.subTotal / 100) * res.data.coupon.discount,
      });
    }
  };

  // Remove coupon
  const removeCoupon = async () => {
    const res = await axios.delete('/shopping-cart/remove-coupon');

    if (res.data.status === 200) {
      setCart({
        ...cart,
        discountTitle: '',
        discount: 0,
        totalPrice: cart.subTotal - 0,
      });
    }
  };

  const setAllowCheckout = () => {
    dispatch(allowCheckout());
    push('/checkout/shipping-information');
  };

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Shopping Cart</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <div className='cart'>
        {!cart.totalPrice ? (
          <span>
            <h1>Your cart is empty</h1>
            <div className='cart_goBack'>
              <FaChevronLeft fill='#4870ff' size={14} />
              <Link to='/'>Continue Shopping</Link>
            </div>
          </span>
        ) : (
          <>
            <main>
              <div className='cart_items'>
                <div className='cart_title'>
                  <h1>MY SHOPPING CART ({cart.cartProducts.length})</h1>
                </div>
                {cart.cartProducts.map((product) =>
                  isLogged ? (
                    <CartItem
                      productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                      productAlt={product.title}
                      productTitle={product.title}
                      productCategory={product.category}
                      productPrice={`$${product.totalPrice}`}
                      removeProduct={removeProduct}
                      key={product.id}
                      productSlug={product.slug}
                      productQuantity={product.quantity}
                      updateQuantity={updateQuantity}
                      defaultProductPrice={`$${product.defualtPrice}`}
                      productDiscount={product.discount}
                    />
                  ) : (
                    <CartItem
                      productImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.product.image1}`}
                      productAlt={product.product.title}
                      productTitle={product.product.title}
                      productCategory={product.product.CategoryTitle}
                      productPrice={`$${product.price}`}
                      removeProduct={removeProduct}
                      key={product.product.id}
                      productSlug={product.product.slug}
                      productQuantity={product.quantity}
                      updateQuantity={updateQuantity}
                      defaultProductPrice={product.defualtPrice}
                      productDiscount={product.product.discount}
                    />
                  )
                )}
              </div>
            </main>
            <section>
              <div className='cart_totalAmmount'>
                <div className='cart_totalAmmount_recap'>
                  <H2 title='Total Ammount' />
                  <H4 title={`Subtotal: $${cart.subTotal}`} />
                  <H4 title={`Shipping price: $${cart.shippingPrice}`} />
                  <H4 title={`Tax: ${cart.taxPrice}%`} />
                  <H4 title={`Discount: ${cart.discount}%`} />
                  <H3 title={`Total Ammount: $${cart.totalPrice}`} />
                </div>
                <div className='cart_coupon'>
                  <div className='cart_coupon_sep1'></div>
                  <div className='cart_coupon_form'>
                    <Form
                      formType='text'
                      formName='coupon'
                      formPlaceholder='Coupon Code'
                      autocompleteOff={true}
                      formValue={cart.discount ? cart.discountTitle : coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={cart.discount ? true : false}
                    />
                    <Button
                      buttonTitle={
                        !cart.discount ? 'APPLY COUPON' : 'REMOVE COUPON'
                      }
                      noArrow={true}
                      onClick={!cart.discount ? addCoupon : removeCoupon}
                    />
                  </div>
                  <div className='cart_coupon_sep2'></div>
                </div>
                <Button
                  buttonTitle='CHECKOUT'
                  buttonClass='cart_checkout'
                  onClick={setAllowCheckout}
                />
                <div className='cart_goBack'>
                  <FaChevronLeft fill='#4870ff' size={14} />
                  <Link to='/'>Continue Shopping</Link>
                </div>
              </div>
            </section>
            <div className='cart_goBack_desktop'>
              <FaChevronLeft fill='#4870ff' size={14} />
              <Link to='/'>Continue Shopping</Link>
            </div>
          </>
        )}
      </div>
      <SimilarProducts />
    </>
  );
};

export default Cart;
