const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const UserModel = require("./model/userModel.js");
const jwt = require("jsonwebtoken");

// Controllers
const { registerUser } = require("./controller/usersController.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error: ", error));

// ROUTE HANDLERS

app.post("/register", registerUser);

// Login route handler
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      $or: [{ username: username }, { password: password }],
    });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
