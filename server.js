if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Parse data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Helmet - basic security
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1500 * 24 * 60 * 60 * 1000,
    },
  })
);

// Router
app.use('/user', require('./routes/user')); // User route
app.use('/products', require('./routes/products')); // Product route
app.use('/shopping-cart', require('./routes/cart')); // Cart route
app.use('/checkout', require('./routes/checkout')); // Cart route
app.use('/contact', require('./routes/contact')); // Contact route

// Serve react in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
