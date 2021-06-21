const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({

    email:{type:String,required:true},
    passwordHash:{type:String, required:true},
    myorders:[{ type:Schema.Types.ObjectId, ref: 'ParcelOrder'}]
});

const User = mongoose.model("User",userSchema);

module.exports = User;