const express = require("express");
const router=new express.Router();
const Student = require("../models/student");
router.post("/students", async (req, res) => {
    try {
      const student = new Student(req.body);
      const result = await student.save();
      res.send(result);
    } catch (error) {
      res.send(error.message);
    }
  });
  router.get("/students", async (req, res) => {
    try {
      const students = await Student.find();
      res.send(students);
    } catch (error) {
      res.send(error.message);
    }
  });
  router.get("/students/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.send("Not Found");
      } else {
        res.send(student);
      }
    } catch (error) {
      res.send(error.message);
    }
  });
  router.get("/studentsByEmail/:email", async (req, res) => {
    try {
      const student = await Student.findOne({ email: req.params.email });
      if (!student) {
        res.send("Not Found");
      } else {
        res.send(student);
      }
    } catch (error) {
      res.send(error.message);
    }
  });
  router.delete("/students/:id", async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        res.send("student not found");
      } else {
        res.send("student deleted");
      }
    } catch (error) {
      res.send(error.message);
    }
  });
  router.put("/students/:id", async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new:true});
      if (!student) {
        res.send("student not found");
      } else {
        res.send(student);
      }
    } catch (error) {
      res.send(error.message);
    }
  });

module.exports=router;

