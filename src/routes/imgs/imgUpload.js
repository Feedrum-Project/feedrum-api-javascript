const {ImageModel} = require("../../models");

let uploadImages = async (req, res) => {
	let files = req.files;
	let savedImages = [];

	for (file of files) {
		let {filename, path} = file;

		path = path.split("/").slice(4).join("/");

		let image = new Image({
			IMAGE_NAME: filename,
			IMAGE_PATH: path
		});

		let imageSave;

		try {
			imageSave = await image.save();
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot upload image"});
		}

		savedImages.push(imageSave);
	}

	return res.status(200).send({status: "ok", msg: "images uploaded succesfully", result: savedImages});
}


module.exports = {
	uploadImages: uploadImages
}