import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Styles
import './orderSummary.scss';

// Components
import OrderSummaryItem from './Components/OrderSummaryItem';
import H4 from '../HtmlTags/H4';
import H2 from '../HtmlTags/H2';
import Img from '../HtmlTags/Img';
import Loading from '../Loading/Loading';

// Assets
import MinusImg from '../../assets/svg/minus.svg';
import PlusImg from '../../assets/svg/plus.svg';

const OrderSummary = () => {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [orderSummary, setOrderSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    setLoading(true);

    const fetchOrderSummary = async () => {
      const res = await axios.get('/shopping-cart');

      setOrderSummary(res.data.cart);
      setLoading(false);
    };

    fetchOrderSummary();
  }, []);

  if (loading) return <Loading />;

  return (
    <summary>
      <div className='order_summary'>
        <div
          className={
            summaryOpen
              ? 'order_summary_wrapper order_summary_open'
              : 'order_summary_wrapper'
          }
        >
          <div className='order_summary_title'>
            <H2 title='Order Summary' />
            <Img
              imageSrc={summaryOpen ? MinusImg : PlusImg}
              imageAlt='Times icon'
              onClick={() => setSummaryOpen(!summaryOpen)}
            />
          </div>
          <div className='order_summary_totalAmmount'>
            <H4 title={`Subtotal: $${orderSummary.subTotal}`} />
            <H4 title={`Shipping price: $${orderSummary.shippingPrice}`} />
            <H4 title={`Tax: ${orderSummary.taxPrice}%`} />
            <H4 title={`Discount: ${orderSummary.discount}%`} />
            <H4 title={`Total Ammount: $${orderSummary.totalPrice}`} />
          </div>
          <div className='order_summary_items'>
            {orderSummary.cartProducts.map((product) =>
              !isLogged ? (
                <OrderSummaryItem
                  itemImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.product.image1}`}
                  itemAlt={product.product.title}
                  itemTitle={product.product.title}
                  itemQty={product.quantity}
                  itemPrice={`$${product.price}`}
                  itemLink={`/product/${product.product.slug}`}
                  key={product.product.id}
                  itemDiscount={product.product.discount}
                />
              ) : (
                <OrderSummaryItem
                  itemImg={`https://sweath-ecommerce.s3.eu-central-1.amazonaws.com/${product.image1}`}
                  itemAlt={product.title}
                  itemTitle={product.title}
                  itemQty={product.quantity}
                  itemPrice={`$${product.totalPrice}`}
                  itemLink={`/product/${product.slug}`}
                  key={product.id}
                  itemDiscount={product.discount}
                />
              )
            )}
          </div>
        </div>
      </div>
    </summary>
  );
};

export default OrderSummary;
