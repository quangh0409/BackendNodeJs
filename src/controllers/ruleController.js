const mongoose = require("mongoose");
const Rule = mongoose.model("rules");
const path = require("path");
const logger = require("../utils/winston/winston");
const Time = require("../utils/time");
exports.getAllRules = (req, res) => {
  Rule.find({}, { name: 1, referenceTime: 1, referenceSpace: 1, action: 1 }).then(
    (data) => {
      res.send({ data });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.create = (req, res) => {
  var referenceTime = {
    startTime: req.body.referenceTime.startTime,
    endTime: req.body.referenceTime.endTime,
  };
  var newRule = new Rule({
    name: req.body.name,
    referenceTime: referenceTime,
    referenceSpace: req.body.referenceSpace,
    action: req.body.action,
  });
  newRule
    .save()
    .then((result) => {
      if (req.query) {
        logger.info(
          `API: /api/example is called with query ${JSON.stringify(
            req.query
          )}. Result: ${JSON.stringify(result)}`
        );
      } else {
        logger.info(
          `API: /api/example is called. Result: ${JSON.stringify(result)}`
        );
      }
      res.send(newRule);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  var ruleId = req.params.ruleId;

  Rule.findOne({ _id: ruleId }).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      logger.error(
        `[${path.basename(__filename, ".js")}.js][getById] error: ${err}`
      );
      res.status(400).send(err);
    }
  );
};

exports.update = (req, res) => {
  const query = { _id: req.params.ruleId };
  Rule.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      referenceTime: req.body.referenceTime,
      referenceSpace: req.body.referenceSpace,
      action: req.body.action,
    },
    { upsert: true, new: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send("Invalid user supplied");
    });
};

exports.delete = (req, res) => {
  const query = { _id: req.params.ruleId };
  Rule.findOneAndRemove(query)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
