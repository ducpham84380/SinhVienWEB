const mongoose = require("mongoose");
const specializedSchema = new mongoose.Schema({
    NameSpecialized: String,
});

module.exports = mongoose.model("Specialized", specializedSchema);