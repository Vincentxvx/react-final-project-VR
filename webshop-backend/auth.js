const jwt = require("jsonwebtoken");

const SECRET = "x9F!vQ2#Lm8@Kp$7ZrT1uWc%5YdA&hS3BnE6gJ0oX4CqR";

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];

    console.log(token)

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken, SECRET };
