const {Router} = require("express");

const {singInCheckMiddleware, adminSingedIn} = require("../../middlewares");

const {getPostComentaries} = require("./getPostComentaries");
const {createComentary} = require("./createComentary");
const {updateComentary} = require("./updateComentary");
const {getComentary} = require("./getComentary")

let comsRouter = new Router();

comsRouter
	.post("/create", singInCheckMiddleware, createComentary);

comsRouter
	.post("/commentary/update", singInCheckMiddleware, updateComentary);

comsRouter
	.get("/", getPostComentaries);

comsRouter
	.get("/comentary", getComentary);

module.exports = {
	comsRouter: comsRouter
}