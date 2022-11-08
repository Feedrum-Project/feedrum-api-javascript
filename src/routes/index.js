const {Router} = require("express");

const postsRouter = require("./posts");
const userRouter = require("./users");
const imgRouter = require("./imgs");

let routes = new Router();

routes.use("/users", userRouter);

routes.use("/posts", postsRouter);

routes.use("/imgs", imgRouter);

module.exports = routes;