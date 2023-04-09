const ruleBuilder = require('../controllers/ruleController');

module.exports = app => {
  app
    .route('/rules')
    .get(ruleBuilder.getAllRules)
    .post(ruleBuilder.create);

  app
    .route('/rules/:RuleId')
    .get(ruleBuilder.getById)
    .put(ruleBuilder.update)
    .delete(ruleBuilder.delete);
};