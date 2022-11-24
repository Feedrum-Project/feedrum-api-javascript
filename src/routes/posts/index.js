const {Router} = require("express");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");

const {imageUpload} = require("../../utils/");

const {comsRouter} = require("../commentaries");

const {getAllPostsByAuthor} = require("./postsGetAllByAuthor");
const {getPostById} = require("./getPostById");
const {upvotePost} = require("./upvotePost");
const {updatePost} = require("./postUpdate");
const {createPost} = require("./postCreate");
const {getPosts} = require("./postsGet");


let postsRouter = new Router();


postsRouter
	.post("/postcreate", singInCheckMiddleware, createPost);

postsRouter
	.put("/post/update", singInCheckMiddleware, updatePost);

postsRouter
	.put("/post/upvote", singInCheckMiddleware, upvotePost);

postsRouter
	.get("/", getPosts);

postsRouter
	.get("/postsBy", getAllPostsByAuthor);

postsRouter
	.get("/post", getPostById);

postsRouter
	.use("/commentaries", comsRouter);


module.exports = postsRouter;