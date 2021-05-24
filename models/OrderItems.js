const { DataTypes } = require('sequelize');

const db = require('../config/database');

// Order items model
const OrderItems = db.define('OrderItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  image1: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
  },
  slug: {
    type: DataTypes.STRING,
  },
});

module.exports = OrderItems;
