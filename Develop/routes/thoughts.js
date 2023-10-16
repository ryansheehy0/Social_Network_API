const router = require("express").Router()
const { Thought, User } = require("../models/index")

/*
DELETE /api/thoughts/:id

POST /api/thoughts/:thoughtId/reactions
  -
DELETE /api/thoughts/:thoughtId/reactions
*/

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
    // Add though's id to the user's friends
    user.pushFriend(thought._id)
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
    const filter = { _id: new ObjectId(req.params.id) }
    const update = { thoughtText: req.body.thoughtText }
    const thought = await Thought.findOneAndUpdate(filter, update)
    res.status(200).json(thought)
  }catch(error){
    console.error(error)
    res.status(500).json({message: error})
  }
})


module.exports = router