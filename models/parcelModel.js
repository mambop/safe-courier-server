const mongoose = require("mongoose");


const parcelSchema = new mongoose.Schema({

    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    pickup: { type: String, required: true },
 

});

const Parcel = mongoose.model("ParcelOrder", parcelSchema);
module.exports = Parcel;