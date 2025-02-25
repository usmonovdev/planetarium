const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const morgan = require("morgan")
const colors = require("colors")

// Initialize dotenv
dotenv.config()

// Connect to DB
connectDB()

const app = express();

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`.white.bold);
});
