const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { User, Cart, Order, OrderItems } = require('../config/associations');

// Register page
router.post('/register', async (req, res) => {
  const users = await User.findAll();
  // New user
  const {
    registerFirstName,
    registerLastName,
    registerEmail,
    registerPassword,
  } = req.body;
  const passwordLenght = registerPassword.length;
  const hashedPassword = await bcrypt.hash(registerPassword, 10);
  const user = await User.findOne({ where: { email: registerEmail } });

  // Check if firs & last name isn't empty
  if (!registerFirstName) {
    res.send({ status: 406, errorMsg: 'Missing first name' });
    return;
  }

  if (!registerLastName) {
    res.send({ status: 406, errorMsg: 'Missing last name' });
    return;
  }

  // Check if user already exists
  if (user || !registerEmail) {
    res.send({ status: 409 });
    return;
  }

  try {
    // Check if password is longer than 5 characters
    if (passwordLenght > 5) {
      if (users.length === 0) {
        const user = await User.create({
          firstName: registerFirstName,
          lastName: registerLastName,
          email: registerEmail,
          password: hashedPassword,
          role: 'ADMIN',
        });

        await Cart.create({
          UserId: user.id,
        });

        res.send({ status: 201 });
        return;
      } else {
        const user = await User.create({
          firstName: registerFirstName,
          lastName: registerLastName,
          email: registerEmail,
          password: hashedPassword,
        });

        await Cart.create({
          UserId: user.id,
        });

        res.send({ status: 201 });
        return;
      }
    } else {
      res.send({ status: 411 });
      return;
    }
  } catch {
    res.send({ status: 400 });
  }
});

// Login route
router.post('/login', async (req, res) => {
  // Login credential
  const { loginEmail, loginPassword } = req.body;
  const user = await User.findOne({ where: { email: loginEmail } });
  const userName = !user ? '' : `${user.firstName} ${user.lastName}`;

  try {
    if (!user) {
      res.send({ status: 401, errorMsg: 'Incorrect email' });
      return;
    }

    if (await bcrypt.compare(loginPassword, user.password)) {
      const payload = {
        sub: user.id,
        role: user.role,
        name: userName,
        email: user.email,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET);

      res.cookie('accessToken', accessToken);
      res.send({ status: 200 });
      return;
    } else {
      res.send({ status: 401, errorMsg: 'Incorrect password' });
      return;
    }
  } catch (err) {
    res.send({ status: 501 });
    return;
  }
});

router.get('/users-all', async (req, res) => {
  const users = await User.findAll();

  console.log(users);
  res.send({ users });
});

// Auth user - on refresh
router.get('/auth', async (req, res) => {
  const token = req.cookies.accessToken; // Token from cookies

  if (!token) {
    res.send({ status: 400 });
    return;
  } else {
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET); // Decode token

      req.session.user = decodedToken;
      res.send({
        status: 200,
        name: decodedToken.name,
        role: decodedToken.role,
        email: decodedToken.email,
      });
    } catch {
      res.send({ status: 400 });
    }
  }
});

// Logout route
router.delete('/logout', (req, res) => {
  // Delete cookies
  req.session.user = undefined;
  res.cookie('accessToken', '', { maxAge: 1 });
  res.send({ status: 200 });
});

// Orders
router.get('/orders', jwtAuthenticate, async (req, res) => {
  const orders = await Order.findAll({
    where: { UserId: req.session.user.sub },
  });

  res.send({ status: 200, orders });
});

// Orders - for dropdown
router.get('/orders/dropdown', jwtAuthenticate, async (req, res) => {
  const orders = await Order.findAll({ limit: 3 });

  res.send({ status: 200, orders });
});

// Orders
router.get('/order/:id', jwtAuthenticate, async (req, res) => {
  try {
    if (!req.session.user) {
      res.send({ status: 404, order: undefined });
    } else {
      const order = await Order.findOne({
        where: { id: req.params.id, UserId: req.session.user.sub },
        include: OrderItems,
      });

      res.send({ status: 200, order });
    }
  } catch {
    res.send({ status: 500 });
  }
});

// JWT middleware
async function jwtAuthenticate(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.send({ status: 401, msg: 'User has to be logged in' });
  } else {
    try {
      const decodedJwt = await jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { id: decodedJwt.sub } });

      if (user && user.role === 'ADMIN' && decodedJwt.role === 'ADMIN') {
        next();
      } else {
        res.send({
          status: 401,
          msg: "User doesn't have premission to do this action",
        });

        return;
      }
    } catch {
      res.send({
        status: 401,
        msg: 'Invalid signature',
      });
    }
  }
}

module.exports = router;
