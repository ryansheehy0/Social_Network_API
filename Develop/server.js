const api = require("./routes/index")
const express = require("express")
const app = express()

app.use(express.json())
app.use("/api", api)

app.listen(3000, () => {
  console.log("Server running on port 3000.")
})