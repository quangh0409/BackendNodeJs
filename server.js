const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const mongodb = require("./src/config/db/mongodb");
const logger = require("./src/utils/winston/winston");

global.Product = require("./src/models/product");
global.Event = require("./src/models/event");
global.Rule = require("./src/models/rule");
global.Staff = require("./src/models/staff");
global.Action = require("./src/models/action");
global.Notification = require("./src/models/notification");

mongoose.Promise = global.Promise;

const productroutes = require("./src/routes/productRoute");
const eventRoutes = require("./src/routes/eventRoute");
const ruleRoutes = require("./src/routes/ruleRoute");
const staffRoutes = require("./src/routes/staffRoute");
const notificationRoutes = require("./src/routes/notificationRoute");
const actionRoutes = require("./src/routes/actionRoute");

const port = 8080;
const app = express();

// Đăng ký middleware để log mỗi request tới server
app.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

mongodb();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

productroutes(app);
eventRoutes(app);
ruleRoutes(app);
staffRoutes(app);
notificationRoutes(app);
actionRoutes(app);

app.listen(port);

app.use((req, res) => {
  logger.error(
    `[${path.basename(__filename, ".js")}] url: ${req.originalUrl} not found`
  );
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

logger.info(
  `[${path.basename(__filename, ".js")}] Server started on port ${port}`
);
