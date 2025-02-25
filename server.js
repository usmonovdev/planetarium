const express = require("express");
const dotenv = require("dotenv")

// Initialize dotenv
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
