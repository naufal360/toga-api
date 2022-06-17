const mongoose = require("mongoose");

const tanamanSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  latinName: {
    type: String,
    required: true,
  },

  family: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  goodPart: {
    type: String,
    required: true,
  },

  efficacy: {
    type: [String],
    required: true,
  },
});

const Tanaman = mongoose.model("Tanaman", tanamanSchema);

module.exports = Tanaman;