const {Router, static} = require("express");
const os = require("os");

const {singInCheckMiddleware, getFiles} = require("../../middlewares");
const {imageUpload} = require("../../utils");

const {uploadImages} = require("./imgUpload");
const {getMyImages} = require("./getMyImages");
const {deleteImg} = require("./deleteImg")

let imgRouter = new Router();

imgRouter.use("/", static(`${os.homedir()}${process.env.IMG_PATH}`));

imgRouter.post("/upload", singInCheckMiddleware, imageUpload.array("image", 15), getFiles, singInCheckMiddleware,  uploadImages);

imgRouter.delete("/delete/", singInCheckMiddleware, deleteImg);

imgRouter.get("/my", singInCheckMiddleware, getMyImages);

module.exports = imgRouter