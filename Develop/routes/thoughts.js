const router = require("express").Router()
const mongoose = require("mongoose")
const { Thought, User, Reaction } = require("../models/index")

// Get all thoughts
router.get("/", async (req, res) => {
  try{
    const allThoughts = await Thought.find({}).exec()
    res.status(200).json(allThoughts)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Get thought by id
router.get("/:id", async (req, res) => {
  try{
    const thought = await Thought.findById(req.params.id).exec()
    res.status(200).json(thought)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Create new thought
router.post("/", async (req, res) => {
  try{
    // Create new thought
    const thought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username
    })
    // Get user
    const user = await User.findById(req.body.userId).exec()
    // Add though's id to the user's thoughts
    await user.pushThought(thought._id)
    // Send new thought
    res.status(200).json(thought)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Update thought
router.put("/:id", async (req, res) => {
  try{
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const update = { thoughtText: req.body.thoughtText }
    const thought = await Thought.findOneAndUpdate(filter, update, { new: true })
    res.status(200).json(thought)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Delete thought
router.delete("/:id", async (req, res) => {
  try{
    // Find thought
    const thought = await Thought.findById(req.params.id)
    // Find user
    const username = thought.username
    const user = await User.findOne({ username }).exec()
    // Delete thought
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const deletedThought = await Thought.findOneAndDelete(filter, { new: true }).exec()
    // Remove thought from user
    await user.removeThought(thought._id)
    // Send the deleted thought
    res.status(200).json(deletedThought)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Create new reaction
router.post("/:thoughtId/reactions", async (req, res) => {
  try{
    // Create reaction
    const reaction = new Reaction({
      reactionBody: req.body.reactionBody,
      username: req.body.username
    })
    // Get thought
    const thought = await Thought.findById(req.params.thoughtId)
    // Add reaction to thought
    const updatedThought = await thought.pushReaction(reaction)
    // Send updated thought
    res.status(200).json(updatedThought)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

// Delete reaction
router.delete("/:thoughtId/reactions", async (req, res) => {
  try{
    // Get thought
    const thought = await Thought.findById(req.params.thoughtId)
    // Remove reaction from thought
    const deletedReaction = await thought.removeReaction(req.body.reactionId)
    // Send deleted reaction
    res.status(200).json(deletedReaction)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})

module.exports = router