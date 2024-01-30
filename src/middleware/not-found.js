const notFound = function (req, res, next){
	res.status(404).send(
		"Route not found"
	)
};

module.exports = notFound