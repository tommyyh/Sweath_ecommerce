const { DataTypes } = require('sequelize');

const db = require('../config/database');
const randomDigit = Math.floor(Math.random() * 90000) + 1000;

// Cart model - logged in
const Cart = db.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: randomDigit,
  },
  subTotal: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  discountTitle: {
    type: DataTypes.STRING,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  taxPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  shippingPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

// Cart - not logged in
class GuestCart {
  constructor(cart) {
    this.id = cart.id || randomDigit;
    this.totalPrice = cart.totalPrice || 0;
    this.subTotal = cart.subTotal || 0;
    this.shippingPrice = cart.shippingPrice || 0;
    this.taxPrice = cart.taxPrice || 0;
    this.discount = cart.discount || 0;
    this.discountTitle = cart.discountTitle || '';
    this.cartProducts = cart.cartProducts || [];
  }

  addProduct(product) {
    // Check if product already exists
    let storedProduct = this.cartProducts.find(
      (cartProduct) => cartProduct.product.id == product.id
    );

    if (!storedProduct) {
      // If no then create it
      storedProduct = {
        product,
        quantity: 1,
        price: product.totalPrice,
        defualtPrice: product.price,
      };

      this.cartProducts.push(storedProduct);
    } else {
      // If yes then increment quantity
      storedProduct.quantity = +storedProduct.quantity + 1;
      storedProduct.price =
        storedProduct.product.totalPrice * storedProduct.quantity;
      storedProduct.defualtPrice =
        storedProduct.product.price * storedProduct.quantity;
    }

    // Update total price and subtotal
    this.subTotal = this.subTotal + product.totalPrice;
    this.totalPrice = this.subTotal - (this.subTotal / 100) * this.discount;
  }

  updateQuantity(product, quantity) {
    const storedProduct = this.cartProducts.find(
      (cartProduct) => cartProduct.product.id == product.id
    );

    // Update subtotal and total price
    this.subTotal +=
      storedProduct.product.totalPrice * (quantity - storedProduct.quantity);
    this.totalPrice = this.subTotal - (this.subTotal / 100) * this.discount;

    // Update product quantity and price
    storedProduct.quantity = quantity;
    storedProduct.price =
      storedProduct.quantity * storedProduct.product.totalPrice;
    storedProduct.defualtPrice =
      storedProduct.quantity * storedProduct.product.price;
  }

  removeProduct(product) {
    const storedProduct = this.cartProducts.find(
      (cartProduct) => cartProduct.product.id == product.id
    );
    const productIndex = this.cartProducts.indexOf(storedProduct);

    // Remove product from cart
    this.cartProducts.splice(productIndex, 1);

    // Update price
    this.subTotal = this.subTotal - storedProduct.price;

    // Update total price
    this.totalPrice = this.subTotal - (this.subTotal / 100) * this.discount;
  }

  addCoupon(coupon) {
    // Add discount
    this.discount = coupon.discount;
    this.discountTitle = coupon.title;

    // Calculate total price
    this.totalPrice = this.subTotal - (this.subTotal / 100) * this.discount;
  }

  removeCoupon() {
    // Add discount
    this.discount = 0;
    this.discountTitle = '';

    // Calculate total price
    this.totalPrice = this.subTotal - (this.subTotal / 100) * this.discount;
  }
}

module.exports = {
  Cart,
  GuestCart,
};
