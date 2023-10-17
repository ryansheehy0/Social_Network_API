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
},{
  toJSON: {
    virtuals: true
  }
})

thought.virtual("reactionCount").get(function(){
  return this.reactions.length
})

thought.methods.pushReaction = async function(reaction){
  this.reactions.push(reaction)
  await this.save()
  return this
}

thought.methods.removeReaction = async function(reactionId){
  let deletedReaction
  this.reactions = this.reactions.filter((currentReaction) => {
    if(currentReaction.reactionId.equals(reactionId)){
      deletedReaction = currentReaction
      return false
    }
    return true
  })
  await this.save()
  return deletedReaction
}

module.exports = mongoose.model("Thought", thought)