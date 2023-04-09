const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

global.Product = require("./src/models/product");
global.Event = require("./src/models/event");
global.Rule = require("./src/models/rule");
const productroutes = require("./src/routes/productRoute");
const eventRoutes = require("./src/routes/eventRoute");
const ruleRoutes = require("./src/routes/ruleRoute");
const URL =
  "mongodb+srv://quangvt5:Qvt29092001.@cluster0.k0fqybm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
// mongoose.set("useFindAndModify", false);

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const port = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

productroutes(app);
eventRoutes(app);
ruleRoutes(app);

app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
