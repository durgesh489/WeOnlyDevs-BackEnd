const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Work = require("../models/work");

const router = new express.Router();

// Define the uploads directory
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize multer
const upload = multer({ storage });

// POST API to create a new work entry with file upload
router.post("/work-details", upload.single("resources"), async (req, res) => {
  try {
    const work = new Work({
      ...req.body,
      resources: req.file ? `uploads/${req.file.filename}` : null,
    });

    const result = await work.save();
    res.status(201).send({ success: true, work: result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: error.message });
  }
});

// GET API to retrieve all work entries
router.get("/work-details", async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).send(works);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;

