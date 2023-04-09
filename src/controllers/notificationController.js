const mongoose = require("mongoose");
const Notification = mongoose.model("notifications");
const path = require("path");
const logger = require("../utils/winston/winston");

exports.getAllNotifications = (req, res) => {
  Notification.find().then(
    (data) => {
      res.send({ data });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.create = (req, res) => {
  var newNotification = new Notification({
    action: req.body.action,
    staff: req.body.staff,
    event: req.body.event,
  });
  newNotification
    .save()
    .then(() => {
      res.send(newNotification);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  var notificationId = req.params.notificationId;

  Notification.findOne({ _id: notificationId }).then(
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
  const query = { _id: req.params.notificationId };
  Notification.findOneAndUpdate(
    query,
    {
      action: req.body.action,
      staff: req.body.staff,
      event: req.body.event,
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
  const query = { _id: req.params.notificationId };
  Notification.findOneAndRemove(query)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
