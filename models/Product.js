const { DataTypes } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');

const db = require('../config/database');

// Product model
const Product = db.define('Product', {
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
  brand: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  image1: {
    type: DataTypes.STRING,
  },
  image2: {
    type: DataTypes.STRING,
  },
  image3: {
    type: DataTypes.STRING,
  },
  image4: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  available: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now,
  },
  timesBought: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  ssdCapacity: {
    type: DataTypes.STRING,
  },
  os: {
    type: DataTypes.STRING,
  },
  displaySize: {
    type: DataTypes.STRING,
  },
  aspectRatio: {
    type: DataTypes.STRING,
  },
  resolution: {
    type: DataTypes.STRING,
  },
  width: {
    type: DataTypes.STRING,
  },
  height: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.STRING,
  },
  cableType: {
    type: DataTypes.STRING,
  },
  batteryCapacity: {
    type: DataTypes.STRING,
  },
});

// Slugify title
SequelizeSlugify.slugifyModel(Product, {
  source: ['title'],
  slugOptions: { lower: true, strict: true },
  column: 'slug',
  incrementalSeparator: '-',
});

module.exports = Product;
