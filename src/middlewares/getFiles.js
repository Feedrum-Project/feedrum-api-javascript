module.exports = async (req, res, next) => {
	req.body.files = req.files;

	next();
}