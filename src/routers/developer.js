const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Developer = require("../models/developer"); // Ensure the correct model is imported

const router = new express.Router();

// Define the uploads directory
const UPLOADS_DIR = path.join(__dirname, '../uploads'); // Adjust the path as necessary

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR); // Create uploads directory if it doesn't exist
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Append timestamp
  },
});

// Initialize multer
const upload = multer({ storage });

// POST API to create a new developer with image upload
router.post("/developers", upload.single("image"), async (req, res) => {
  try {
    const developer = new Developer({
      ...req.body,
      image: req.file ? `uploads/${req.file.filename}` : null, // Save relative path
    });

    const result = await developer.save(); // Save to the database
    res.status(201).send({ success: true, developer: result }); // Send back the created developer
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).send({ success: false, message: error.message }); // Send error message
  }
});

// GET API to retrieve all developers
router.get("/developers", async (req, res) => {
  try {
    const developers = await Developer.find(); // Retrieve all developers from the database
    res.status(200).send(developers); // Send back the list of developers
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ success: false, message: error.message }); // Send error message
  }
});

module.exports = router;
