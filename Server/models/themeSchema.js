const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true,
        min:6,
        max: 255,
    },
    Logo : {
        type: String,
        required: true,
        min:6,
        max: 255,
    },
    PrimaryColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    SecondaryColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    ThirdColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    FourthColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    NavigationFontSize : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    Title : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    TitleFontSize : {
        type: Number,
        required: true,
        min: 6,
        max: 255,
    },
    SubTitle : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    SubTitleFontSize : {
        type: Number,
        required: true,
        min: 6,
        max: 255,
    },
    SidePadding : {
        type: Number,
        required: true,
        min: 6,
        max: 255,
    },
})
module.exports = mongoose.model("Theme" , themeSchema );