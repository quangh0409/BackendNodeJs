const mongoose = require("mongoose");
const { events } = require("../models/event");
const Event = mongoose.model("events");

exports.getAllEvents = (req, res) => {
  Event.find().then(
    (data) => {
      res.send({ data });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.create = (req, res) => {
  var newEvent = new Event({
    name: req.body.name,
    camera: req.body.camera,
  });
  newEvent
    .save()
    .then(() => {
      res.send(newEvent);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  var eventId = req.params.eventId;

  Event.findOne({ _id: eventId }).then(
    (data) => {
      res.send(data);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.update = (req, res) => {
  const query = { _id: req.params.eventId };
  Event.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      camera: req.body.camera,
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
  const query = { _id: req.params.eventId };
  Event.findOneAndRemove(query)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
