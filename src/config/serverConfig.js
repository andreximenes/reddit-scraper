function errorHandler (err, req, res, next) {
    console.log(err);
    if (err.status === 404)
        res.status(404).json({ url: req.originalUrl, message: " Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
}


module.exports = {
    errorHandler
}