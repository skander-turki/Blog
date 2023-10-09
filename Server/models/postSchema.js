const mongoose =  require ("mongoose");

const baseOption = {
    discriminatorKey : "Post", 
    collection: "Post", 
    timestamps : true,
};

const postSchema = new mongoose.Schema({
    Titre : {
        type : String, 
        required: true,
        min: 6,
        max: 255,
        },
    Description : {
        type : String, 
        required: true,
        min: 6,
        max: 255,
    },
    DatePost : {
        type : Date,
        required: true,
    },
    ViewNumber: {
        type : Number,
        required: true,
    },
    LikesNumber: {
        type : Number,
        required: true,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }]
}, baseOption); 

module.exports = mongoose.model("Post" , postSchema);