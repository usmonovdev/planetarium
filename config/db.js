const mongoose = require("mongoose")

const connectDB = async () => {
  const connecting = await mongoose.connect(process.env.MONGO_URI)
  console.log(`Mongodb connected to: ${connecting.connection.host}`.bgBlue);
}

module.exports = connectDB