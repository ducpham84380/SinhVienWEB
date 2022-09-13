const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    Msgv: String,
    Namegv:  String,
    DateOfBirth: Date,
    Address:String,
    PhoneNumber: String,
    Email: String,
    Specialized: String,
    Avatar: String,
    Password: String,
    Active: Boolean,
});

module.exports = mongoose.model("Teacher", TeacherSchema);