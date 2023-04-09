const mongoose = require("mongoose");
const Rule = mongoose.model("rules");
const path = require("path");
const logger = require("../utils/winston/winston");

exports.getAllRules = (req, res) => {
  Rule.find().then(
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
  });
  newRule
    .save()
    .then(() => {
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
