const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.listen(3003,()=>{
    console.log("Server running on port 3003")
})