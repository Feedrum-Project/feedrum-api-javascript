const os = require("os");
const fs = require("fs");

const {ImageModel} = require("../../models");

const {validId} = require("../../utils").validations;

let deleteImg = async (req, res) => {
	let id = req.query["id"];
	let image, imageDeleted;

	if (!validId(id)) {
		return res.status(400).send({code: "E_INVALID_BODY", msg: "IMAGE_ID must be a valid ID"});
	}

	try {
		image = await ImageModel.findOne({_id: id});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get image"});
	}

	if (!image)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "image not founded"});

	let imagePath = `${os.homedir}${process.env.IMG_PATH}${image.IMAGE_NAME}`;

	try {
		let delImg = fs.unlinkSync(imagePath);
	} catch (e) {
		console.log(e);
	}



	try {

		imageDeleted = await ImageModel.deleteOne({_id: image._id});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot remove img from database"})
	}

	return res.status(200).send({status: "ok", result: imageDeleted});
}

module.exports = {
	deleteImg: deleteImg
} 