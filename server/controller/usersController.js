const UserModel = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;

async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(402)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Login controller
async function loginUser(req, res) {
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
      return res.status(401).json({ message: "Incorrect password" });
    }

    const payload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1m" });
    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_KEY, {
      expiresIn: "1d",
    });

    // Set refresh token on an HTTP-only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 60 * 24,
    });

    res
      .status(201)
      .json({ success: true, message: "User logged in successfully!", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Handle refreshing token
async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res
      .status(401)
      .json({ success: false, message: "Refresh token is missing!" });
  }

  try {
    const decodedToken = jwt.verify(refreshtoken, JWT_SECRET_REFRESH_KEY);

    // Generate a new access token
    const payload = {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      username: decodedToken.username,
    };
    const newAccessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1m",
    });

    res.status(200).json({ success: true, token: newAccessToken });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  refreshToken
};
