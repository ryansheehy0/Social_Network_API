const router = require("express").Router()
const mongoose = require("mongoose")
const { User, Thought } = require("../models/index")

// Get all users
router.get("/", async (req, res) => {
  try{
    const allUsers = await User.find({}).exec()
    res.status(200).json(allUsers)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Get user by id
router.get("/:id", async (req, res) => {
  try{
    const user = await User.findById(req.params.id).exec()
    res.status(200).json(user)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Create new user
router.post("/", async (req, res) => {
  try{
    const user = await User.create({
      username: req.body.username,
      email: req.body.email
    })
    res.status(200).json(user)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Update user
router.put("/:id", async (req, res) => {
  try{
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const update = { username: req.body.username }
    const user = await User.findOneAndUpdate(filter, update, { new: true })
    res.status(200).json(user)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Delete user
router.delete("/:id", async (req, res) => {
  try{
    // Get the user's thoughts
    const user = await User.findById(req.params.id).exec()
    const thoughts = [...user.thoughts]
    // Delete the user
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const deletedUser = await User.findOneAndDelete(filter).exec()
    // Delete each of the user's thoughts only after the user is deleted
    thoughts.forEach(async thoughtId => {
      const filter = { _id: new mongoose.Types.ObjectId(thoughtId) }
      await Thought.deleteOne(filter).exec()
    })
    // Send the deleted user
    res.status(200).json(deletedUser)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Add new friend to user
router.post("/:userId/friends/:friendId", async (req, res) => {
  try{
    // Find user
    const user = await User.findById(req.params.userId).exec()
    // Add friend to user's friends array
    const updatedUser = await user.pushFriend(req.params.friendId)
    // Send updated user
    res.status(200).json(updatedUser)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Delete friend from user
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try{
    // Find user
    const user = await User.findById(req.params.userId).exec()
    // Remove friend from user's friends array
    const updatedUser = await user.removeFriend(req.params.friendId)
    // Send updated user
    res.status(200).json(updatedUser)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

module.exports = router