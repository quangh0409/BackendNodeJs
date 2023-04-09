const actionBuilder = require('../controllers/actionController');

module.exports = app => {
  app
    .route('/actions')
    .get(actionBuilder.getAllActions)
    .post(actionBuilder.create);

  app
    .route('/actions/:actionId')
    .get(actionBuilder.getById)
    .put(actionBuilder.update)
    .delete(actionBuilder.delete);
};