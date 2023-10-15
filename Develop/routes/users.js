const router = require("express").Router()
const { ObjectId } = require("mongoose")
const { User, Thoughts, Thought } = require("../models/index")

/*
POST /api/users/:userId/friends/:friendId
DELETE /api/users/:userId/friends/:friendId
*/

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
    const filter = { _id: new ObjectId(req.params.id) }
    const update = { username: req.body.username }
    const user = await User.findOneAndUpdate(filter, update)
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
    const thoughts = await User.findById(req.params.id).thoughts.exec()
    // Delete the user
    const filter = { _id: new ObjectId(req.params.id) }
    const deletedUser = await User.findOneAndDelete(filter).exec()
    // Delete each of the user's thoughts only after the user is deleted
    thoughts.forEach(async thoughtId => {
      const filter = { _id: new Objectid(thoughtId) }
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
    // Find friend
    const friend = await User.findById(req.params.friendId).exec()
    // Add friend to user's friends array
    const filter = { _id: new ObjectId()}
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})


module.exports = router