module.exports = {
    //Authorization: Bearer <token>
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    }
    /* verifyToken: (req, res, next) => {
        const bearerSession = req.session.token; 
        const cookieSession = req.cookies["tokenSession"]
        if (!bearerSession || !cookieSession) {
            res.sendStatus(403);
        }
        console.log("Autenticación exitosa.")
        req.token = cookieSession
        next();
    } */
}