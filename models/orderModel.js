const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({

    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    order: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String},
    presentLoc: { type: String},


});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;