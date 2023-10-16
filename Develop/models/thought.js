const mongoose = require("mongoose")
const reactionSchema = require("./reaction")

const thought = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(){
      const options = {month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true}
      return new Date(this.createdAt).toLocaleString("en-US", options)
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
})

thought.methods.pushReaction = function(reaction){
  this.reactions.push(reaction)
  return this
}

thought.methods.removeReaction = function(reactionId){
  let deletedReaction
  this.reactions = this.reactions.filter((currentReaction) => {
    if(currentReaction.reactionId === reactionId){
      deletedReaction = currentReaction
      return false
    }
    return true
  })
  return deletedReaction
}

thought.virtual("reactionCount").get(() => {
  return this.reactions.length
})

module.exports = mongoose.model("Thought", thought)