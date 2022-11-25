const {Router} = require("express");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");

const {cancelCommentaryUpvote} = require("./cancelCommentaryUpvote");
const {getPostComentaries} = require("./getPostComentaries");
const {upvoteCommentary} = require("./upvoteCommentary");
const {createComentary} = require("./createComentary");
const {updateComentary} = require("./updateComentary");
const {getComentary} = require("./getComentary");

let comsRouter = new Router();

comsRouter
	.post("/create", singInCheckMiddleware, createComentary);

comsRouter
	.post("/commentary/update", singInCheckMiddleware, updateComentary);

comsRouter
	.put("/commentary/upvote", singInCheckMiddleware, upvoteCommentary);

comsRouter
	.put("/commentary/upvote/cancel", singInCheckMiddleware, cancelCommentaryUpvote);

comsRouter
	.get("/", getPostComentaries);

comsRouter
	.get("/comentary", getComentary);

module.exports = {
	comsRouter: comsRouter
}