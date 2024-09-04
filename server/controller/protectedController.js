const UserModel = require("../model/userModel.js");

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllUsers };
