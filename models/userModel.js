const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({

    email: { type: String, required: true },
    passwordHash: { type: String, required: true },

});

const User = mongoose.model("user", userSchema);

module.exports = User;