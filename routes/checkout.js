if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
const {
  Cart,
  Order,
  CartProducts,
  OrderItems,
  Product,
} = require('../config/associations');

// Checkout info
router.post('/shipping-info', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      company,
      email,
      phone,
    } = req.body;
    const cart =
      req.session.user &&
      (await Cart.findOne({ where: { UserId: req.session.user.sub } }));
    const totalPrice = !req.session.user
      ? req.session.cart.totalPrice
      : cart.totalPrice;
    const discount = !req.session.user
      ? req.session.cart.discount
      : cart.discount;

    const shippingInformation = {
      firstName,
      lastName,
      price: totalPrice,
      addressLine1,
      addressLine2,
      phone,
      email,
      zipCode,
      company,
      state,
      city,
      discount,
    };

    // Save to session
    req.session.shippingInformation = shippingInformation;
    res.send({ status: 201 });
  } catch {
    res.send({ status: 400 });
  }
});

// Payment
router.post('/payment', async (req, res) => {
  try {
    const cart = !req.session.user
      ? req.session.cart
      : await Cart.findOne({ where: { UserId: req.session.user.sub } });
    const amount = Math.round(cart.totalPrice * 100 * 10) / 10;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch {
    res.send({ status: 400 });
  }
});

// Finish page
router.get('/finish-order', async (req, res) => {
  try {
    const {
      price,
      addressLine1,
      addressLine2,
      phone,
      email,
      firstName,
      lastName,
      company,
      state,
      city,
      discount,
      zipCode,
    } = req.session.shippingInformation;
    const fullName = `${firstName} ${lastName}`;
    const cart = await Cart.findOne({
      where: { UserId: req.session.user.sub },
      include: CartProducts,
    });

    if (req.session.user) {
      // Create order
      const newOrder = await Order.create({
        totalAmmount: price,
        addressLine1,
        addressLine2,
        phone,
        email,
        zipCode,
        fullName,
        companyName: company,
        state,
        city,
        discount,
        paymentMethod: 'Credit / Debit Card',
        transportMethod: 'Delivery',
        UserId: req.session.user.sub,
      });

      // Add order items
      cart.cartProducts.forEach(async (cartProduct) => {
        const { title, image1, quantity, totalPrice, slug } = cartProduct;
        const product = await Product.findOne({ where: { slug: slug } });

        await OrderItems.create({
          title,
          image1,
          quantity,
          totalPrice,
          slug,
          OrderId: newOrder.id,
        });

        // Update how many times the product has been bought
        await product.update({
          timesBought: product.timesBought + 1,
        });
      });

      // Clear the cart
      await cart.destroy();

      // Create a new cart
      await Cart.create({
        UserId: req.session.user.sub,
      });

      res.send({ status: 201 });
    } else {
      // Add order items
      req.session.cart.cartProducts.forEach(async (cartProduct) => {
        const { slug } = cartProduct;
        const product = await Product.findOne({ where: { slug: slug } });

        // Update how many times the product has been bought
        await product.update({
          timesBought: product.timesBought + 1,
        });
      });
    }
  } catch {
    res.send({ status: 400 });
  }
});

module.exports = router;
