const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  img_url: {
    type: String,
    required: true,
    unique: true,
  },
  caption: {
    type: String,
    // required: true, 
  },
},{
  timestamp:true
});

//----Create Collection in Database
const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
