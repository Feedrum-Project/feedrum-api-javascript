const {Router} = require("express");

const {createPost} = require("./postCreate");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");


let postsRouter = new Router();

postsRouter
	.post("/postcreate", singInCheckMiddleware, createPost);

postsRouter
	.get("/", singInCheckMiddleware, (req, res) => res.send({code: "iasc", msg: "akcn"}));



module.exports = postsRouter;