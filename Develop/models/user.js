const mongoose = require("mongoose")
const { isEmail } = require("validator")

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
},{
  toJSON: {
    virtuals: true
  }
})

user.virtual("friendCount").get(function(){
  return this.friends.length
})

// Friend methods
user.methods.pushFriend = async function(friendId){
  // Prevent the same friend from being added
  for(let i = 0; i < this.friends.length; i++){
    const currentFriendId = this.friends[i]
    if(currentFriendId.equals(friendId)) return {message: `${friendId} is already a friend.`}
  }
  // If the new friend isn't already a friend then push new friend
  this.friends.push(friendId)
  // Save to database
  await this.save()
  // Return the updated user
  return this
}

user.methods.removeFriend = async function(friendId){
  this.friends = this.friends.filter((currentFriendId) => {
    return !currentFriendId.equals(friendId)
  })
  await this.save()
  return this
}

// Thoughts methods
user.methods.pushThought = async function(thoughtId){
  // Push new thought
  this.thoughts.push(thoughtId)
  // Save to database
  await this.save()
  // Return the updated user
  return this
}

user.methods.removeThought = async function(thoughtId){
  this.thoughts = this.thoughts.filter((currentThoughtId) => {
    return !currentThoughtId.equals(thoughtId)
  })
  await this.save()
  return this
}

module.exports = mongoose.model("User", user)