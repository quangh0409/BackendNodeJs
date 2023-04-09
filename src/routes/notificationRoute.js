const notificationBuilder = require("../controllers/notificationController");

module.exports = (app) => {
  app
    .route("/notifications")
    .get(notificationBuilder.getAllNotifications)
    .post(notificationBuilder.create);

  app
    .route("/notifications/:notificationId")
    .get(notificationBuilder.getById)
    .put(notificationBuilder.update)
    .delete(notificationBuilder.delete);
};
