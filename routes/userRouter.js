// object destructured import
const { Router } = require('express')
const { body, validationResult } = require('express-validator')

//import user and show
const { User, Show } = require('../models')

//this will handle endpoints
const userRouter = Router()




//endpoint that interracts with sequelize

//find all the users
userRouter.get("/", async (req, res) => {
    try {
        const users = await User.findAll()
        if(!users.length) {
            throw new Error("No users found!")
        }
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
})


// find user using params and ID
userRouter.get("/:id", async (req, res) => {
    try {
        const oneUser = await User.findOne({where: { id: req.params.id }})
        if (!oneUser) {
            throw new Error("No user found with that ID")
        }
        res.status(200).json(oneUser)
    } catch(error) {
        res.status(404).send(error)
    }

})

// find all shows watched by a user using id in req.params
//should include the model SHOW
userRouter.get("/:id/shows", async (req, res) => {
    try{
        const userShows = await User.findOne({where: { id: req.params.id}, include: Show})
        const allShowsWatched =  userShows.shows
        if (!userShows.length){
            throw new Error("No shows found!")
        }
        res.status(200).json(userShows)
    } catch(error) {
       res.status(404).send(error) 
    }
})








// export to use in other files
module.exports = userRouter