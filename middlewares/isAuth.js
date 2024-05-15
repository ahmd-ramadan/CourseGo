const jwt = require('jsonwebtoken');
const isAuthenticated = async(req, res, next) => {
    //! Get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    // console.log(token);
    //! Verfiy the token
    const key = process.env.JWT_SECRET_KEY;
    const verifyToken = jwt.verify(
        token,
        key,
        (err, decoded) => {
            if(err) return false;
            else return decoded;
        }
    ); 
    //! Find the user
    // console.log(verifyToken);
    if(!verifyToken) {
        const err = new Error("Token expired please login again");
        next(err);
    }
    req.user = verifyToken.id;
    next();
}

module.exports = isAuthenticated;