const mongoose = require("mongoose")

const reaction = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(){
      const options = {month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true}
      return new Date(this.createdAt).toLocaleString("en-US", options)
    }
  }
},{
  _id: false
})

module.exports = reaction