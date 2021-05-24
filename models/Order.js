const { DataTypes } = require('sequelize');

const db = require('../config/database');
const randomDigit = Math.floor(Math.random() * 90000) + 10000;

// Order model
const Order = db.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: randomDigit,
  },
  totalAmmount: {
    type: DataTypes.FLOAT,
  },
  addressLine1: {
    type: DataTypes.STRING,
  },
  addressLine2: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
  },
  zipCode: {
    type: DataTypes.INTEGER,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  companyName: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'Credit Card/Debit Card',
  },
  transportMethod: {
    type: DataTypes.STRING,
    defaultValue: 'Credit Card/Debit Card',
  },
});

module.exports = Order;
