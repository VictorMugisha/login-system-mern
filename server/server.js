const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Controllers
const { registerUser, loginUser } = require("./controller/usersController.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error: ", error));

// ROUTE HANDLERS

app.post("/register", registerUser);

// Login route handler
app.post("/login", loginUser);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
