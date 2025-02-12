const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];     //receives HTTP request and splits authorization by the "empty space" to get the token on position[1]

    if (!token) return res.status(401).json({ message: "Denied access! No token provided" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).json({message: 'Unauthorized. Invalid token'});
    }
}

module.exports = authenticateToken;