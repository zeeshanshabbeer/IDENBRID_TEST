const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
userId:{
    type:String,
    required:true,
    unique:true
},
access_token:{
    type:String,
    required:true,
}
});

//----Create Collection in Database
const User = mongoose.model("User", userSchema);
module.exports = User;
