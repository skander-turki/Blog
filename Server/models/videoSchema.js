const mongoose = require("mongoose");
const postSchema = require("./postSchema");

const videoSchema = new mongoose.Schema({
    LinkVideo :{ 
        type : String, 
        required : true,},
    Duration : {
        type : Number,
       
    },
    asset_id : {
        type : String,
        required : true,
    }
}); 
const video = postSchema.discriminator("Video", videoSchema);
module.exports = {video};