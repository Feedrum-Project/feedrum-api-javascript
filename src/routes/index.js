const {Router} = require("express");

const postsRouter = require("./posts");
const userRouter = require("./users");

let routes = new Router();

routes.use("/users", userRouter);

routes.use("/posts", postsRouter);


module.exports = routes;