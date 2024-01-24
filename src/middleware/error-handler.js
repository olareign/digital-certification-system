export const errorHandler = async function (err, req, res, next){
try {
    if(err){
        return `Error: ${err.name} : ${err.message}`;
    }
} catch (error) {
    next(error)
}
}