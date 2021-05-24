if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const router = express.Router();
const s3 = new aws.S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const {
  Product,
  Category,
  Review,
  Coupon,
  User,
  Favorite,
} = require('../config/associations');

// S3 upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
      callback(null, file.originalname);
    },
    acl: 'public-read',
  }),
});

// Products - Category
router.post('/category/:category', async (req, res) => {
  try {
    const { sortBy, brand, onSale } = req.body;
    let category;
    let orderBy;
    const fetchedCategory = await Category.findByPk(req.params.category, {
      include: Product,
    });

    // Sort by - newest
    if (sortBy === 'newest') {
      orderBy = [[Product, 'createdAt', 'DESC']];
    }

    // Sort by - most popular
    if (sortBy === 'mostPopular') {
      orderBy = [[Product, 'timesBought', 'DESC']];
    }

    // Sort by - price low - high
    if (sortBy === 'priceLowHigh') {
      orderBy = [[Product, 'totalPrice', 'ASC']];
    }

    // Sort by - price high - low
    if (sortBy === 'priceHighLow') {
      orderBy = [[Product, 'totalPrice', 'DESC']];
    }

    // Get all selected brands
    const brands = Object.keys(brand).filter((key) => brand[key] === true);

    // Fetch products
    if (!fetchedCategory.Products[0]) {
      res.send({ status: 200, category: fetchedCategory });

      return;
    }

    if (!brands[0]) {
      category = await Category.findByPk(req.params.category, {
        include: {
          model: Product,
          where: {
            discount: onSale.sale ? { [Op.not]: 0 } : { [Op.not]: 10000 },
          },
        },
        order: orderBy,
      });
    } else {
      category = await Category.findByPk(req.params.category, {
        include: {
          model: Product,
          where: {
            brand: brands,
            discount:
              onSale.sale === true ? { [Op.not]: 0 } : { [Op.not]: 10000 },
          },
        },
        order: orderBy,
      });
    }

    if (!category) {
      res.send({ status: 404, category: null });
    } else {
      res.send({ status: 200, category });
    }
  } catch {
    res.send({ status: 500 });
  }
});

// Delete category
router.delete('/category/:category', jwtAuthenticateAdmin, async (req, res) => {
  const category = await Category.findByPk(req.params.category, {
    include: Product,
  });

  try {
    await category.Products.forEach((product) => {
      // Delete images belonging to products belonging to the deleted category
      s3.deleteObjects(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Delete: {
            Objects: [
              {
                Key: product.image1,
              },
              {
                Key: product.image2,
              },
              {
                Key: product.image3,
              },
              {
                Key: product.image4,
              },
            ],
          },
        },
        (err, data) => {
          if (err) {
            res.send({ status: 500, error: err });
          }
        }
      );
    });
    await category.destroy(); // Delete category

    res.send({ status: 200 });
  } catch {
    res.send({ status: 500 });
  }
});

// Add product
router.post(
  '/new',
  upload.array('productImgs'),
  jwtAuthenticateAdmin,
  async (req, res) => {
    const {
      productTitle,
      productPrice,
      productDescription,
      ssdCapacity,
      displaySize,
      resolution,
      productWidth,
      productOs,
      aspectRatio,
      productHeight,
      productWeight,
      batteryCapacity,
      productDiscount,
      cableType,
      productCategory,
      productBrand,
    } = req.body;
    const totalPrice = productPrice - (productPrice / 100) * productDiscount;

    try {
      await Product.create({
        title: productTitle,
        price: productPrice,
        description: productDescription,
        ssdCapacity: ssdCapacity,
        brand: productBrand,
        displaySize: displaySize,
        resolution: resolution,
        width: productWidth,
        os: productOs,
        aspectRatio: aspectRatio,
        height: productHeight,
        weight: productWeight,
        batteryCapacity: batteryCapacity,
        cableType: cableType,
        CategoryTitle: productCategory,
        discount: productDiscount,
        totalPrice: totalPrice,
        image1: req.files[0].key,
        image2: req.files[1].key,
        image3: req.files[2].key,
        image4: req.files[3].key,
      });

      res.send({ status: 201 });
    } catch {
      res.send({ status: 400 });
    }
  }
);

// Edit product
router.get('/edit/product/:product', jwtAuthenticateAdmin, async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.product },
  });

  if (!product) {
    res.send({ status: 404 });
  } else {
    res.send({ status: 200, product });
  }
});

router.put(
  '/edit/product/:product',
  jwtAuthenticateAdmin,
  upload.array('productImgs'),
  async (req, res) => {
    const {
      productTitle,
      productPrice,
      productDescription,
      ssdCapacity,
      displaySize,
      resolution,
      productWidth,
      productOs,
      aspectRatio,
      productHeight,
      productWeight,
      batteryCapacity,
      productDiscount,
      cableType,
      productCategory,
      productBrand,
    } = req.body;
    const totalPrice = productPrice - (productPrice / 100) * productDiscount;
    const product = await Product.findOne({
      where: { slug: req.params.product },
    });

    try {
      if (req.files.length === 4) {
        // Delete images if new ones are being passed
        s3.deleteObjects(
          {
            Bucket: process.env.AWS_BUCKET_NAME,
            Delete: {
              Objects: [
                {
                  Key: product.image1,
                },
                {
                  Key: product.image2,
                },
                {
                  Key: product.image3,
                },
                {
                  Key: product.image4,
                },
              ],
            },
          },
          (err, data) => {
            if (err) {
              res.send({ status: 500, error: err });
            }
          }
        );

        await product.update({
          title: productTitle,
          price: productPrice,
          description: productDescription,
          ssdCapacity: ssdCapacity,
          brand: productBrand,
          displaySize: displaySize,
          resolution: resolution,
          width: productWidth,
          os: productOs,
          aspectRatio: aspectRatio,
          height: productHeight,
          weight: productWeight,
          batteryCapacity: batteryCapacity,
          cableType: cableType,
          CategoryTitle: productCategory,
          discount: productDiscount,
          totalPrice: totalPrice,
          image1: req.files[0].key,
          image2: req.files[1].key,
          image3: req.files[2].key,
          image4: req.files[3].key,
        });
      } else {
        await product.update({
          title: productTitle,
          price: productPrice,
          description: productDescription,
          ssdCapacity: ssdCapacity,
          brand: productBrand,
          displaySize: displaySize,
          resolution: resolution,
          width: productWidth,
          os: productOs,
          aspectRatio: aspectRatio,
          height: productHeight,
          weight: productWeight,
          batteryCapacity: batteryCapacity,
          cableType: cableType,
          CategoryTitle: productCategory,
          discount: productDiscount,
          totalPrice: totalPrice,
        });
      }

      res.send({ status: 201 });
    } catch {
      res.send({ status: 400 });
    }
  }
);

// Delete product
router.delete('/delete/:product', jwtAuthenticateAdmin, async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.product },
  });

  try {
    // Delete images
    s3.deleteObjects(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
          Objects: [
            {
              Key: product.image1,
            },
            {
              Key: product.image2,
            },
            {
              Key: product.image3,
            },
            {
              Key: product.image4,
            },
          ],
        },
      },
      (err, data) => {
        if (err) {
          res.send({ status: 500, error: err });
        }
      }
    );

    await product.destroy();

    res.send({ status: 200 });
  } catch {
    res.send({ status: 500 });
  }
});

// Add new category
router.get('/category', async (req, res) => {
  const categories = await Category.findAll();

  res.send({ categories });
});

router.post('/category', jwtAuthenticateAdmin, async (req, res) => {
  try {
    await Category.create({
      title: req.body.category,
    });

    res.send({ status: 201 });
  } catch {
    res.send({ status: 501 });
  }
});

// Product
router.get('/show/:title', async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.title },
    include: Review,
  });

  res.send({ status: 200, product });
});

// Trending
router.get('/trending', async (req, res) => {
  const products = await Product.findAll({
    limit: 6,
    order: [['timesBought', 'DESC']],
  });

  res.send({ products });
});

// Trending
router.get('/similar', async (req, res) => {
  const products = await Product.findAll({
    limit: 4,
    order: [['timesBought', 'DESC']],
  });

  res.send({ products });
});

router.post('/add-coupon', jwtAuthenticateAdmin, async (req, res) => {
  try {
    await Coupon.create({
      title: req.body.couponTitle,
      discount: req.body.couponDiscount,
    });

    res.send({ status: 201 });
  } catch {
    res.send({ status: 500 });
  }
});

// Add to favorite
router.post('/add-to-favorite/:product', jwtAuthenticate, async (req, res) => {
  try {
    if (req.session.user) {
      const product = await Product.findOne({
        where: { slug: req.params.product },
      });
      const {
        title,
        image1,
        price,
        totalPrice,
        discount,
        slug,
        timesBought,
        brand,
      } = product;

      await Favorite.create({
        title,
        image1,
        price,
        totalPrice,
        discount,
        slug,
        timesBought,
        brand,
        UserId: req.session.user.sub,
      });

      res.send({ status: 201 });
    } else {
      res.send({ status: 400 });
    }
  } catch {
    res.send({ status: 500 });
  }
});

// Favorite
router.post('/favorite-products', jwtAuthenticate, async (req, res) => {
  try {
    if (req.session.user) {
      const { sortBy, brand, onSale } = req.body;
      let favorite;
      let orderBy;

      // Sort by - newest
      if (sortBy === 'newest') {
        orderBy = [['createdAt', 'DESC']];
      }

      // Sort by - most popular
      if (sortBy === 'mostPopular') {
        orderBy = [['timesBought', 'DESC']];
      }

      // Sort by - price low - high
      if (sortBy === 'priceLowHigh') {
        orderBy = [['totalPrice', 'ASC']];
      }

      // Sort by - price high - low
      if (sortBy === 'priceHighLow') {
        orderBy = [['totalPrice', 'DESC']];
      }

      // Get all selected brands
      const brands = Object.keys(brand).filter((key) => brand[key] === true);

      // Fetch products
      if (!brands[0]) {
        favorite = await Favorite.findAll({
          where: {
            UserId: req.session.user.sub,
            discount:
              onSale.sale === true ? { [Op.not]: 0 } : { [Op.not]: 10000 },
          },
          order: orderBy,
        });
      } else {
        favorite = await Favorite.findAll({
          where: {
            brand: brands,
            UserId: req.session.user.sub,
            discount:
              onSale.sale === true ? { [Op.not]: 0 } : { [Op.not]: 10000 },
          },
          order: orderBy,
        });
      }

      res.send({ status: 200, favorite });
    } else {
      res.send({ status: 401 });
    }
  } catch {
    res.send({ status: 500 });
  }
});

// Remove favorite
router.delete(
  '/favorite/remove/:product',
  jwtAuthenticate,
  async (req, res) => {
    try {
      const favorite = await Favorite.findOne({
        where: { slug: req.params.product },
      });

      await favorite.destroy();

      res.send({ status: 200 });
    } catch {
      res.send({ status: 500 });
    }
  }
);

// Search products
router.post('/search', async (req, res) => {
  const searchedProducts = await Product.findAll({
    where: {
      title: { [Op.like]: '%' + req.body.searchField + '%' },
    },
  });
  const searchedProductsArray = !req.body.searchField ? [] : searchedProducts;

  res.send({ status: 200, searchedProductsArray });
});

router.post('/add-review', jwtAuthenticate, async (req, res) => {
  try {
    if (req.session.user) {
      const { reviewHeadline, reviewContent, reviewRating, productSlug } =
        req.body;
      const product = await Product.findOne({ where: { slug: productSlug } });

      await Review.create({
        headline: reviewHeadline,
        rating: reviewRating,
        content: reviewContent,
        author: req.session.user.name,
        UserId: req.session.user.sub,
        ProductId: product.id,
      });

      res.send({ status: 200 });
    } else {
      res.send({ status: 200 });
    }
  } catch {
    res.send({ status: 500 });
  }
});

router.post('/on-sale/:categoryTitle', async (req, res) => {
  try {
    const { sortBy, brand, discount } = req.body;
    let category;
    let orderBy;
    const checkProducts = await Category.findByPk(req.params.categoryTitle, {
      include: Product,
    });

    // Get all selected brands
    const brands = Object.keys(brand).filter((key) => brand[key] === true);

    // Sort by - newest
    if (sortBy === 'newest') {
      orderBy = [[Product, 'createdAt', 'DESC']];
    }

    // Sort by - most popular
    if (sortBy === 'mostPopular') {
      orderBy = [[Product, 'timesBought', 'DESC']];
    }

    // Sort by - price low - high
    if (sortBy === 'priceLowHigh') {
      orderBy = [[Product, 'totalPrice', 'ASC']];
    }

    // Sort by - price high - low
    if (sortBy === 'priceHighLow') {
      orderBy = [[Product, 'totalPrice', 'DESC']];
    }

    // Sort by - discount ammount - high to low
    if (discount === 'saleHighLow') {
      orderBy = [[Product, 'discount', 'DESC']];
    }

    // Sort by - discount ammount - low to high
    if (discount === 'saleLowHigh') {
      orderBy = [[Product, 'discount', 'ASC']];
    }

    // Fetch products
    if (!checkProducts.Products[0]) {
      if (!brands[0]) {
        category = await Category.findByPk(req.params.categoryTitle, {
          include: {
            model: Product,
          },
          order: orderBy,
        });
      } else {
        category = await Category.findByPk(req.params.categoryTitle, {
          include: {
            model: Product,
            where: {
              brand: brands,
              discount: { [Op.not]: 0 },
            },
          },
          order: orderBy,
        });
      }
    } else {
      if (!brands[0]) {
        category = await Category.findByPk(req.params.categoryTitle, {
          include: {
            model: Product,
            where: {
              discount: { [Op.not]: 0 },
            },
          },
          order: orderBy,
        });
      } else {
        category = await Category.findByPk(req.params.categoryTitle, {
          include: {
            model: Product,
            where: {
              brand: brands,
              discount: { [Op.not]: 0 },
            },
          },
          order: orderBy,
        });
      }
    }

    console.log(category);
    res.send({ status: 200, category });
  } catch {
    res.send({ status: 500 });
  }
});

router.post('/products-sales', async (req, res) => {
  try {
    const { sortBy, brand, discount } = req.body;
    let category;
    let orderBy;

    // Get all selected brands
    const brands = Object.keys(brand).filter((key) => brand[key] === true);

    // Sort by - newest
    if (sortBy === 'newest') {
      orderBy = [['createdAt', 'DESC']];
    }

    // Sort by - most popular
    if (sortBy === 'mostPopular') {
      orderBy = [['timesBought', 'DESC']];
    }

    // Sort by - price low - high
    if (sortBy === 'priceLowHigh') {
      orderBy = [['totalPrice', 'ASC']];
    }

    // Sort by - price high - low
    if (sortBy === 'priceHighLow') {
      orderBy = [['totalPrice', 'DESC']];
    }

    // Sort by - discount ammount - high to low
    if (discount === 'saleHighLow') {
      orderBy = [['discount', 'DESC']];
    }

    // Sort by - discount ammount - low to high
    if (discount === 'saleLowHigh') {
      orderBy = [['discount', 'ASC']];
    }

    // Fetch products
    if (!brands[0]) {
      category = await Product.findAll({
        where: {
          discount: { [Op.not]: 0 },
        },
        order: orderBy,
      });
    } else {
      category = await Product.findAll({
        where: {
          discount: { [Op.not]: 0 },
        },
        order: orderBy,
      });
    }

    res.send({ status: 200, category });
  } catch (err) {
    res.send({ status: 500 });
  }
});

// JWT middleware
async function jwtAuthenticate(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.send({ status: 401, msg: 'User has to be logged in' });
    return;
  } else {
    try {
      await jwt.verify(accessToken, process.env.JWT_SECRET);

      next();
    } catch {
      res.send({
        status: 401,
        msg: 'Invalid signature',
      });
      return;
    }
  }
}

// JWT middleware - Admin
async function jwtAuthenticateAdmin(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.send({ status: 401, msg: 'User has to be logged in' });
    return;
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
