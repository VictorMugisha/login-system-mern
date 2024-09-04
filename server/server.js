const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const UserModel = require("./model/userModel.js");

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

// Register route handler
app.post("/register", registerUser);

// Login route handler
app.post("/login", loginUser);


// Get list of all users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
