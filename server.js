const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

global.Product = require("./src/models/product");
global.Event = require("./src/models/event");
global.Rule = require("./src/models/rule");
const productroutes = require("./src/routes/productRoute");
const eventRoutes = require("./src/routes/eventRoute");
const ruleRoutes = require("./src/routes/ruleRoute");
const URL =
  "mongodb+srv://quangvt5:Qvt29092001.@cluster0.k0fqybm.mongodb.net/test?retryWrites=true&w=majority";
const logger = require("./src/utils/winston/winston");

const port = 8080;
const app = express();

mongoose.Promise = global.Promise;

// Đăng ký middleware để log mỗi request tới server
app.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// const connectDB = async () => {
//   try {
//     await mongoose.connect(URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     logger.info(
//       `[${path.basename(__filename, ".js")}.js][my_function] Connected to mongoDB`
//     );
//     console.log("Connected to mongoDB");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// connectDB();

const mongodb = require("./src/config/db/mongodb");

mongodb();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

productroutes(app);
eventRoutes(app);
ruleRoutes(app);

// mongoose.set("debug", (collectionName, method, query, doc) => {
//   logger.debug(`${collectionName}.${method}`, query, doc);
// });

app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
logger.info(
  `[${path.basename(__filename, ".js")}] Server started on port ${port}`
);
