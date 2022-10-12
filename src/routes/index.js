const {Router} = require("express");
const userRouter = require("./users")

let routes = new Router()

routes.use("/users",userRouter)

module.exports = routes