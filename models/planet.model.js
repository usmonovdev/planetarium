const mongoose = require("mongoose");

const planetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    distanceToStar: {
      type: String,
      required: true,
    },
    diametr: {
      type: String,
      required: true,
    },
    yearDuration: {
      type: String,
      required: true,
    },
    dayDurtion: {
      type: String,
      required: true,
    },
    tempreature: {
      type: String,
      required: true,
    },
    sequenceNumber: {
      type: Number,
      required: true,
    },
    satelittes: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    star: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Star",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Planet", planetSchema);
