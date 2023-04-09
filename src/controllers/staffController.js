const mongoose = require("mongoose");
const Staff = mongoose.model("staffs");
const express = require("express");
const app = express();
app.get("/login", (req, res) => {
    res.send("LOGIN");
  });
//get all
app.get('/staffs', async(req, res) => {
    try {
      const staffs = await Staff.find({});
      res.status(200).json(staffs);
  
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })
  //
  //get by id
  app.get('/staffs/:id', async(req, res) =>{
    try {
      const {id} = req.params;
      const staff = await Staff.findById(id);
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })
  //update a staff
  app.put('/staffs/:id', async(req, res)=>{
    try {
      const {id} = req.params;
      const staff = await Staff.findByIdAndUpdate(id,req.body);
      //check if staff exist
      if(!staff){
        return res.status(404).json({message:`Cannot find any staff in list`})
      }
      return res.status(200).json(staff)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })
  //create a staff
  app.post('/staff', async (req, res) => {
      try {
          const staff = await Staff.create(req.body)
          res.status(200).json(staff);
  
      } catch (error) {
          console.log(error.message);
          res.status(500).json({message: error.message})
      }
  })
  //delete a staff
  app.delete('/staffs/:id', async(req, res) =>{
    try {
      const {id} = req.params;
      const staff = await Staff.findByIdAndDelete(id);
      if(!staff){
        return res.status(404).json({message:`can't find any staff with ID ${id}`})
      }
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

