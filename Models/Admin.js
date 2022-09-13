const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    NameUser: String,
    Password:  String,
    Active: Boolean,
});

module.exports = mongoose.model("Admin", AdminSchema);