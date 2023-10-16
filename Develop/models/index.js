const mongoose = require("mongoose")
const User = require("./user")
const Thought = require("./thought")
const reactionSchema = require("./reaction")

const Reaction = mongoose.model("Reaction", reactionSchema)

module.exports = { User, Thought, Reaction }