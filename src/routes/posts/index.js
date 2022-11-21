const {Router} = require("express");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");

const {imageUpload} = require("../../utils/");

const {comsRouter} = require("../commentaries");

const {getAllPostsByAuthor} = require("./postsGetAllByAuthor");
const {updatePost} = require("./postUpdate");
const {createPost} = require("./postCreate");
const {getPosts} = require("./postsGet");


let postsRouter = new Router();


postsRouter
	.post("/postcreate", singInCheckMiddleware, createPost);

postsRouter
	.post("/post/update", singInCheckMiddleware, updatePost);

postsRouter
	.get("/", singInCheckMiddleware, getPosts);

postsRouter
	.get("/postsBy", singInCheckMiddleware, getAllPostsByAuthor);

postsRouter
	.use("/commentaries", comsRouter);


module.exports = postsRouter;