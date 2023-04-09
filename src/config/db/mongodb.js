const mongoose = require("mongoose");
const logger = require("../../utils/winston/winston");
const path = require("path");

const URL =
  "mongodb+srv://quangvt5:Qvt29092001.@cluster0.k0fqybm.mongodb.net/test?retryWrites=true&w=majority";

function onError(err) {
  logger.error(
    `[${path.basename(
      __filename,
      ".js"
    )}.js][onError] MongoDB Atlas connection error: ${err}`
  );
}

function onConnected() {
  logger.info(
    `[${path.basename(
      __filename,
      ".js"
    )}.js][onConnected] Connected to mongoDB  Atlas!`
  );
}

function onReconnected() {
  logger.warn(
    `[${path.basename(
      __filename,
      ".js"
    )}.js][onReconnected] MongoDB Atlas reconnected!`
  );
}

function onSIGINT() {
  // eslint-disable-next-line no-undef
  db.close(() => {
    logger.warn(
      `[${path.basename(
        __filename,
        ".js"
      )}.js][onSIGINT] MongoDB Atlas default connection disconnected through app termination!`
    );
    // eslint-disable-next-line no-process-exit
    process.exit();
  });
}

function connect() {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", onError);
  db.on("connected", onConnected);
  db.on("reconnected", onReconnected);

  process.on("SIGINT", onSIGINT);

  mongoose.set("debug", (collectionName, method, query, doc) => {
    logger.debug(`${collectionName}.${method}`, query, doc);
  });
}

module.exports = connect;
