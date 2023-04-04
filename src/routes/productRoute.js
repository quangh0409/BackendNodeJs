const productBuilder = require('../controllers/productController');

module.exports = app => {
  app
    .route('/products')
    .get(productBuilder.getAllProducts)
    .post(productBuilder.create);

  app
    .route('/products/:productId')
    .get(productBuilder.getById)
    .put(productBuilder.update)
    .delete(productBuilder.delete);
};