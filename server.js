const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");

// Initialize dotenv
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Auth routes
app.use("/api/v1/auth", require("./routes/auth.route"));

// Start routes
app.use("/api/v1/stars", require("./routes/star.route"))

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`.white.bold);
});
