const mongoose = require("mongoose");
const Action = mongoose.model("actions");

exports.getAllActions = (req, res) => {
  Action.find().then(
    (data) => {
      res.send({ data });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.create = (req, res) => {
  var newAction = new Action({
    name: req.body.name,
  });
  newAction
    .save()
    .then(() => {
      res.send(newAction);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  var actionId = req.params.actionId;

  Action.findOne({ _id: actionId }).then(
    (data) => {
      res.send(data);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.update = (req, res) => {
  const query = { _id: req.params.actionId };
  Action.findOneAndUpdate(
    query,
    {
      name: req.body.name,
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
  const query = { _id: req.params.actionId };
  Action.findOneAndRemove(query)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
