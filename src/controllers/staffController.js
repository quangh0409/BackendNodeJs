//declaring library
const express = require("express");
const Staff = require("../models/staff");
//using library
const app = express();
//set url, response
app.use(express.json());

//get all
exports.getAllStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find({});
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get by id
exports.getStaffById = async (req, res) => {
  try {
  const id = { _id: req.params.staffId };
  const staff = await Staff.findById(id);
  //check if staff exist
    if(!staff){
      return res.status(404).json({message:`Cannot find any staff in list`})
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
//update a staff
exports.updateStaff = async (req, res) => {
  const id = { _id: req.params.staffId };
  Staff.findByIdAndUpdate(id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send(`Cannot find any staff in list`);
    });
};
//create a staff
exports.createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(200).json(staff);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
//delete a staff
exports.deleteStaff = async (req, res) => {
  try {
    const id = { _id: req.params.staffId };
    const staff = await Staff.findByIdAndDelete(id);
    if(!staff){
      return res.status(404).send(`Cannot find any staff in list`);
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};
