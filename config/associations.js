const { Cart } = require('../models/Cart');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const CartProducts = require('../models/CartProducts');
const OrderItems = require('../models/OrderItems');
const Favorite = require('../models/Favorite');

// User + Cart
User.hasOne(Cart, { onDelete: 'CASCADE' });
Cart.belongsTo(User);

// Category + Product
Category.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(Category);

// User + Review
User.hasMany(Review, { onDelete: 'CASCADE' });
Review.belongsTo(User);

// Product + Review
Product.hasMany(Review, { onDelete: 'CASCADE' });
Review.belongsTo(Product);

// User + Order
User.hasMany(Order, { onDelete: 'CASCADE' });
Order.belongsTo(User);

// Order + order items
Order.hasMany(OrderItems, { onDelete: 'CASCADE' });
OrderItems.belongsTo(Order);

// Cart products + cart
Cart.hasMany(CartProducts, { onDelete: 'CASCADE' });
CartProducts.belongsTo(Cart);

// Favorite + User
User.hasMany(Favorite, { onDelete: 'CASCADE' });
Favorite.belongsTo(User);

// Create table
Cart.sync();
Category.sync();
Order.sync();
Product.sync();
Review.sync();
User.sync();
Coupon.sync();
CartProducts.sync();
OrderItems.sync();
Favorite.sync();

module.exports = {
  Cart,
  Category,
  Order,
  Product,
  Review,
  User,
  Coupon,
  CartProducts,
  OrderItems,
  Favorite,
};
