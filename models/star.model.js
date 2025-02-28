const mongoose = require("mongoose");

const starSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tempreature: {
      type: String,
      required: true,
    },
    massa: {
      type: String,
      required: true,
    },
    diametr: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    planets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Planet" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Star", starSchema);
