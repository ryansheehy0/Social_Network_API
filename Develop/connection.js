const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/socialNetworkAPI")

module.exports = mongoose.connection