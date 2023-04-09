const mongoose = require("mongoose");
const { rules } = require("../models/rule");
const Rule = mongoose.model("rules");
const moment = require("moment");
const Time = require("../utils/time");

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
  var RuleId = req.params.RuleId;

  Rule.findOne({ _id: RuleId }).then(
    (data) => {
      res.send(data);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.update = (req, res) => {
  const query = { _id: req.params.RuleId };
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
  const query = { _id: req.params.RuleId };
  Rule.findOneAndRemove(query)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
