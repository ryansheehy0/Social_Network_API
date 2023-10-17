// Database
const db = require("./connection")

  // Import modules
  //const {} = require("./models/index")

// express
const express = require("express")
const api = require("./routes/index")

const app = express()

app.use(express.json())
app.use("/api", api)

db.once("open", () => {
  console.log("Connect to db.")
  app.listen(3001, () => {
    console.log("Server running on port 3001.")
  })
})