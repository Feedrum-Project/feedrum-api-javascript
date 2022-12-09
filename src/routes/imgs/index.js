const {Router, static} = require("express");
const os = require("os");

const {singInCheckMiddleware} = require("../../middlewares");
const {imageUpload} = require("../../utils");

const {uploadImages} = require("./imgUpload");
const {deleteImg} = require("./deleteImg")

let imgRouter = new Router();

imgRouter.use("/", static(`${os.homedir()}${process.env.IMG_PATH}`));

imgRouter.post("/upload", singInCheckMiddleware, imageUpload.array("image", 15) ,uploadImages);

imgRouter.delete("/delete/", singInCheckMiddleware, deleteImg);

module.exports = imgRouter