const {ImageModel} = require("../../models");

let getImagesUploadedByMe = async (req, res) => {
	try {
		let images = await ImageModel.find({IMAGE_UPLOADED_BY: req.body.decoded._id});

		return res.status(200).send({status: "ok", msg: "images got succesfully", result: images});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get images"});
	}
}

module.exports = {
	getMyImages: getImagesUploadedByMe
}