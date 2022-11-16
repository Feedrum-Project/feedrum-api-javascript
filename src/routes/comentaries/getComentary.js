const {validId} = require("../../utils").validations;
const {ComModel} = require("../../models");


let getComentary = async (req, res) => {
	return res.send("comic soon");
}

module.exports = {
	getComentary: getComentary
}
