const express = require('express');

const router = express.Router();
const { GuestCart } = require('../models/Cart');
const {
  Product,
  Coupon,
  CartProducts,
  Cart,
} = require('../config/associations');

// Cart
router.get('/', async (req, res) => {
  if (!req.session.user) {
    res.send({ status: 200, cart: req.session.cart ? req.session.cart : {} });
  } else {
    const cart = await Cart.findOne({
      where: { UserId: req.session.user.sub },
      include: { model: CartProducts },
    });
    // const discountTitle = !cart.discountTitle ? '' : cart.discountTitle;

    res.send({ status: 200, cart });
  }
});

// Cart - for dropdowns
router.get('/dropdown', async (req, res) => {
  if (!req.session.user) {
    res.send({ status: 200, cart: req.session.cart ? req.session.cart : {} });
  } else {
    const cart = await Cart.findOne({
      where: { UserId: req.session.user.sub },
      include: { model: CartProducts, limit: 2 },
    });
    // const discountTitle = !cart.discountTitle ? '' : cart.discountTitle;

    res.send({ status: 200, cart });
  }
});

// Add product
router.post('/add-to-cart/:product', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.product },
    });

    if (!req.session.user) {
      const cart = new GuestCart(req.session.cart ? req.session.cart : {});

      cart.addProduct(product);
      req.session.cart = cart; // Save cart to session

      res.send({ status: 200 });
    } else {
      const {
        title,
        price,
        image1,
        CategoryTitle,
        totalPrice,
        available,
        slug,
        discount,
      } = product;
      const cart = await Cart.findOne({
        where: { UserId: req.session.user.sub },
      });
      const cartProduct = await CartProducts.findOne({
        where: { CartId: cart.id, slug: req.params.product },
      });

      if (!cartProduct) {
        // Create new cart item
        await CartProducts.create({
          title,
          price,
          image1,
          category: CategoryTitle,
          discountedPrice: totalPrice,
          available,
          slug,
          discount,
          CartId: cart.id,
        });
      } else {
        // Update the quantity instead
        await cartProduct.update({
          quantity: cartProduct.quantity + 1,
        });
      }

      // Update price for all the same products
      const addedProduct = await CartProducts.findOne({
        where: { CartId: cart.id, slug: req.params.product },
      });
      const subTotal = (cart.subTotal += addedProduct.discountedPrice);

      // Add product total price
      await addedProduct.update({
        totalPrice: addedProduct.discountedPrice * addedProduct.quantity,
        defualtPrice: addedProduct.price * addedProduct.quantity,
      });

      // Update the cart
      await cart.update({
        subTotal,
        totalPrice: subTotal - (subTotal / 100) * cart.discount,
      });

      res.send({ status: 200 });
    }
  } catch {
    res.send({ status: 400 });
  }
});

// Update product quantity
router.put('/update-quantity/:product', async (req, res) => {
  try {
    if (!req.session.user) {
      const product = await Product.findOne({
        where: { slug: req.params.product },
      });

      const cart = new GuestCart(req.session.cart);

      cart.updateQuantity(product, req.body.productQuantity);
      req.session.cart = cart;

      res.send({ status: 200 });
    } else {
      const cart = await Cart.findOne({
        where: { UserId: req.session.user.sub },
      });
      const storedProduct = await CartProducts.findOne({
        where: { slug: req.params.product, CartId: cart.id },
      });
      const quantity = req.body.productQuantity;
      const subTotal = (cart.subTotal +=
        storedProduct.discountedPrice * (quantity - storedProduct.quantity));

      // Update cart
      await cart.update({
        subTotal,
        totalPrice: subTotal - (subTotal / 100) * cart.discount,
      });

      // Update stored product
      await storedProduct.update({
        quantity,
        totalPrice: storedProduct.discountedPrice * quantity,
        defualtPrice: storedProduct.price * quantity,
      });

      res.send({ status: 200 });
    }
  } catch {
    res.send({ status: 400 });
  }
});

// Delete product
router.delete('/delete/:product', async (req, res) => {
  try {
    if (!req.session.user) {
      const product = await Product.findOne({
        where: { slug: req.params.product },
      });

      const cart = new GuestCart(req.session.cart);

      cart.removeProduct(product);
      req.session.cart = cart; // Save cart to session

      res.send({ status: 200 });
    } else {
      const cart = await Cart.findOne({
        where: { UserId: req.session.user.sub },
      });
      const storedProduct = await CartProducts.findOne({
        where: { slug: req.params.product, CartId: cart.id },
      });
      const subTotal = cart.subTotal - storedProduct.totalPrice;

      // Remove stored product
      await storedProduct.destroy();

      // Update cart
      await cart.update({
        subTotal,
        totalPrice: subTotal - (subTotal / 100) * cart.discount,
      });

      res.send({ status: 200 });
    }
  } catch {
    res.send({ status: 400 });
  }
});

// Add coupon
router.post('/add-coupon', async (req, res) => {
  const coupon = await Coupon.findOne({
    where: { title: req.body.couponTitle },
  });

  try {
    if (!req.session.user) {
      if (!coupon) {
        res.send({ status: 404 });
      } else {
        const cart = new GuestCart(req.session.cart);

        cart.addCoupon(coupon);
        req.session.cart = cart;

        res.send({ status: 200, coupon: coupon });
      }
    } else {
      if (!coupon) {
        res.send({ status: 404 });
      } else {
        const cart = await Cart.findOne({
          where: { UserId: req.session.user.sub },
        });
        const discount = coupon.discount;

        await cart.update({
          discount,
          totalPrice: cart.subTotal - (cart.subTotal / 100) * discount,
          discountTitle: discount.title,
        });

        res.send({ status: 200, coupon: coupon });
      }
    }
  } catch {
    res.send({ status: 400 });
  }
});

router.delete('/remove-coupon', async (req, res) => {
  try {
    if (!req.session.user) {
      const cart = new GuestCart(req.session.cart);

      cart.removeCoupon();
      req.session.cart = cart;

      res.send({ status: 200 });
    } else {
      const cart = await Cart.findOne({
        where: { UserId: req.session.user.sub },
      });

      // Update the cart
      await cart.update({
        discount: 0,
        discountTitle: null,
        totalPrice: cart.subTotal,
      });

      res.send({ status: 200 });
    }
  } catch {
    res.send({ status: 400 });
  }
});

module.exports = router;
