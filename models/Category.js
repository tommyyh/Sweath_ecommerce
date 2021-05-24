const { DataTypes } = require('sequelize');

const db = require('../config/database');

// Category model
const Category = db.define('Category', {
  title: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
});

module.exports = Category;
