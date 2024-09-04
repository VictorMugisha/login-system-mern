const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const UserModel = require("./model/userModel.js");

// Controllers
const { registerUser, loginUser } = require("./controller/usersController.js");
const { getAllUsers } = require("./controller/protectedController.js");

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
app.get("/users", verifyToken, getAllUsers);

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing!" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired!" });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Invalid token!" });
        }
        return res.status(401).json({ message: "Unauthorized!" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
