const eventBuilder = require("../controllers/eventController");

module.exports = (app) => {
  app
    .route("/events")
    .get(eventBuilder.getAllEvents)
    .post(eventBuilder.create);
  app
    .route("/events/workflow")
    .get(eventBuilder.workflow);
  app
    .route("/events/:eventId")
    .get(eventBuilder.getById)
    .put(eventBuilder.update)
    .delete(eventBuilder.delete);
};
