const mongoose = require("mongoose");

const medikasiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  treatment: {
    type: {
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
    },
    required: true,
  },

  moreAbout: {
    type: String,
    required: true,
  },
  
});

const Medikasi = mongoose.model("Medikasi", medikasiSchema);

module.exports = Medikasi;