const { DataTypes } = require('sequelize');

const db = require('../config/database');

// Cart products model
const cartProducts = db.define('cartProducts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  image1: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  category: {
    type: DataTypes.STRING,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
  },
  defualtPrice: {
    type: DataTypes.FLOAT,
  },
  discountedPrice: {
    type: DataTypes.FLOAT,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  available: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  slug: {
    type: DataTypes.STRING,
  },
});

module.exports = cartProducts;
