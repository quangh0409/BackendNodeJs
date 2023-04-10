const mongoose = require("mongoose");
const Event = mongoose.model("events");
const Rule = mongoose.model("rules");

const Action = mongoose.model("actions");
const Staff = mongoose.model("staffs");
const Notification = mongoose.model("notifications");

const Time = require("../utils/time");
const logger = require("../utils/winston/winston");
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
    createdTime: req.body.createdTime,
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
exports.workflow = (req, res) => {
  var newEvent = new Event({
    name: req.body.name,
    camera: req.body.camera,
    createdTime: req.body.createdTime,
  });
  newEvent
    .save()
    .then(async () => {
      const date = new Date(newEvent.createdTime);
      const createdTime = new Time(
        date.toLocaleTimeString("en-US", { hour12: false })
      );
      // tìm rule thỏa mãn
      const rules = await Rule.find({});
      let action;
      let rule;
      if (rules) {
        rule = rules.find((rule) => {
          return (
            !!createdTime.compare(new Time(rule.referenceTime.startTime)) &&
            !!new Time(rule.referenceTime.endTime).compare(createdTime)
          );
        });
      }

      action = rule.action;

      // tìm staff thảo mãn để gửi notification
      let staffArray;
      const staffs = await Staff.find({});

      if (staffs) {
        staffArray = staffs.filter((staff) => {
          console;
          return (
            !!createdTime.compare(
              new Time(staff.workingTimeDefault.startTime)
            ) &&
            !!new Time(staff.workingTimeDefault.endTime).compare(createdTime)
          );
        });
      }
      // tạo notification
      const newNotification = new Notification({
        action: action,
        staff: staffArray,
        event: newEvent,
      });

      let notification = await Notification.create(newNotification);

      if (notification) {
        console.log("đã tạo thông báo");
      }
      // thêm notification cho staff

      staffArray = staffArray.filter(async (staff, index) => {
        (staff.notification = [...staff.notification, notification._id]),
          await staff.save();
        return true;
      });

      // cập nhạt lại staff cho notification
      // newNotification.staff = staffArray;

      notification.staff = staffArray;
      

      Rule.findOneAndUpdate(
        {_id: notification._id},
        {
          notification,
        },
        { upsert: true, new: true }
      ).then((a)=>{
        notification.save();
      });

      res.send(notification);
    })
    .catch((e) => {
      logger.error(e);
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
      createdTime: req.body.createdTime,
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
