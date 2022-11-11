const {Router} = require("express");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");

const {imageUpload} = require("../../utils/");

const {getAllPostsByAuthor} = require("./postsGetAllByAuthor");
const {createPost} = require("./postCreate");
const {getPosts} = require("./postsGet");


let postsRouter = new Router();

postsRouter
	.post("/postcreate", singInCheckMiddleware, createPost);

postsRouter
	.get("/", singInCheckMiddleware, getPosts);


postsRouter
	.get("/postsBy", singInCheckMiddleware, getAllPostsByAuthor);


module.exports = postsRouter;