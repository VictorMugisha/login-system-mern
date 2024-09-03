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
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or email" });
    }

    const comparePasswords = await bcrypt.compare(password, user.password);
    if (!comparePasswords) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY);

    res
      .status(201)
      .json({ success: true, message: "User logged in successfully!", token });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
