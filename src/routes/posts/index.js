const {Router} = require("express");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");

const {imageUpload} = require("../../utils/");

const {createPost} = require("./postCreate");
const {getPosts} = require("./postsGet")


let postsRouter = new Router();

postsRouter
	.post("/postcreate", singInCheckMiddleware, createPost);

postsRouter
	.get("/", singInCheckMiddleware, getPosts);



module.exports = postsRouter;