const imageSize = require("image-size");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const os = require("os");

// console.log(`${os.homedir()}${process.env.IMG_PATH}`)

let storage = multer.diskStorage({
	destination: function(req, files, callback) {
    	callback(null, `${os.homedir()}${process.env.IMG_PATH}`);
  	},
	filename: function (req, files, callback) {
		let filename = `${uuid()}${path.extname(files.originalname)}`;

    	callback(null, filename);
  	}
});

module.exports = multer({
	storage: storage,
	limits: {
		fileSize: 4 * 1024 * 1024
	},

	fileFilter: function (req, files, callback) {
		let fileExt = path.extname(files.originalname);

		let mimeType = files.mimetype;

		
		if(fileExt !== '.png' && fileExt !== '.jpg' && fileExt !== '.gif' && fileExt !== '.jpeg') 
            return callback(new Error(`Only images are allowed (it mean what ${files.originalname} not image)`).message);

        if (!(mimeType.startsWith("image")))
			return callback(new Error(`Only images are allowed (it mean what ${files.originalname} not image)`).message);



		callback(null, true);
	},

	dest: `${os.homedir()}${process.env.IMG_PATH}`
});