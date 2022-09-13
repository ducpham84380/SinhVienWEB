const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    Mssv: String,
    NameSV:  String,
    DateOfBirth: Date,
    Address:String,
    PhoneNumber: String,
    Email: String,
    Class: String,
    Specialized: String,
    Avatar: String,
    Password: String,
    Active: Boolean,
});

module.exports = mongoose.model("Student", StudentSchema);