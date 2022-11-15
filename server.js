//importing express
const express = require('express')
//assigning web server app constant 
const app = express()

//import userRouter and showRouter to use
const { userRouter, showRouter } = require("./routes")

//import db for sync purposes
const db = require("./db/db")



//allow web server to parse JSON
app.use(express.json())


// every endpoint can be accessed 
app.use("/users", userRouter)
app.use("/shows", showRouter)

//listen on port
app.listen(5001, async () => {
    await db.sync();
    console.log('Listening on port 5001')
})