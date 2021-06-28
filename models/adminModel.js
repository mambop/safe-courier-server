const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminSchema = new mongoose.Schema({

    user: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: Schema.Types.ObjectId, ref: 'order' },
    contact: { type: Schema.Types.ObjectId, ref: 'order' },
    order: { type: Schema.Types.ObjectId, ref: 'order' },
    pickup: { type: Schema.Types.ObjectId, ref: 'order' },
    destination: { type: Schema.Types.ObjectId, ref: 'order' },
    status: { type: Schema.Types.ObjectId, ref: 'order' },
    presentLoc: { type: Schema.Types.ObjectId, ref: 'order' },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true }

});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;