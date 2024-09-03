const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;