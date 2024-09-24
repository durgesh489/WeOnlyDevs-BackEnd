const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  projectDescription: { type: String, required: true },
  projectBudget: { type: String, required: true },
  deadline: { type: Date, required: true },
  techStack: { type: String, required: true },
  resources: { type: String }, // File path or URL to uploaded resource
  additionalNotes: { type: String },
}, { timestamps: true });

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
