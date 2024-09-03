const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const core = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
app.use(express.json());