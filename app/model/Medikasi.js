const mongoose = require("mongoose");

const medikasiSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  material: {
    type: [String],
    required: true,
  },

  make: {
    type: String,
    required: true,
  },
  
  consume: {
    type: String,
    required: true,
  },

  moreAbout: {
    type: String,
    required: true,
  },
});

const Medikasi = mongoose.model("Medikasi", medikasiSchema);

module.exports = Medikasi;