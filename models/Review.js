const { DataTypes } = require('sequelize');

const db = require('../config/database');

// Review model
const Review = db.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  headline: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.STRING,
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Review;
