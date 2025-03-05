const jwt = require('jsonwebtoken');
const secret = "1stAssignment";
function createToken(payload) {
    var token = jwt.sign(payload, secret, {
        expiresIn: 86400
    });
    return token;
}
function verifyToken(token) {
    try {
        let payload = jwt.verify(token, secret);
        return payload;
    }
    catch (err) {
        console.log("couldn't verify token");
        return null;
    }
}
module.exports = { createToken, verifyToken };