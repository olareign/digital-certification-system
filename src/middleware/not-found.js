export const notFound = function (req, res){
	res.status(404).send(
		"Route not found"
	)
};
