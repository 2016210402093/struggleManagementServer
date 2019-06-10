const jwt =require('jsonwebtoken') ;
let secret = 'xwySecret';

module.exports = function (req, res, next)  {

    let t = req.headers.authorization;

    if (t) {
        jwt.verify(t, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ errors: { global: "Invalid token"} });
            } else {
                req.currentUser = decoded.usr;
                next();
            }
        });
    } else {
        res.status(401).json({ errors: { global: "No token"} });
    }
};