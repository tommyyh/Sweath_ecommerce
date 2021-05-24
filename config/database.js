if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_CLOUD } = process.env;

// Database connection
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_CLOUD,
  dialect: 'mysql',
  logging: false,
  define: { timestamps: false },
});

module.exports = db;
