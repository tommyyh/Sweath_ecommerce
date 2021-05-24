const { DataTypes } = require('sequelize');

const db = require('../config/database');

// Coupon model
const Coupon = db.define('Coupon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Coupon;
