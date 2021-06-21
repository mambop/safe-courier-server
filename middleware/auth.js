const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.cookies.cookieToken;
        if (!token)
            return res.status(401).json({ errorMessage: "Unauthorised" });

        //verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorised" });
    }
}

module.exports = auth;