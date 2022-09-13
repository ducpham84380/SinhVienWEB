const mongoose = require("mongoose");

const SubjectsSchema = new mongoose.Schema({
    MaMH: String,
    NameMH:  String,
    ChinhChi: Number,
    Tuition:String,
});

module.exports = mongoose.model("Subjects", SubjectsSchema);