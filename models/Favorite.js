const { DataTypes } = require('sequelize');

const db = require('../config/database');

// Wish list model
const Favorite = db.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image1: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  brand: {
    type: DataTypes.STRING,
  },
  timesBought: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Favorite;
