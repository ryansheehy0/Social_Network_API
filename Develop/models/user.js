const mongoose = require("mongoose")
const {isEmail} = require("validator")

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {validator: isEmail, message: "Invalid email address"}
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thought"
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

user.virtual("friendCount").get(() => {
  return this.friends.length
})

module.exports = mongoose.model("User", user)