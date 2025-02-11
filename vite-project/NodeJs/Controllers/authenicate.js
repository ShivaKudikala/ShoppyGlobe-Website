import jwt from "jsonwebtoken";

// Middleware to authenticate the user
function authenticate(req, res, next){
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    jwt.verify(token, "shoppyglobe", (error, user) => {
        if(error){
            return res.status(403).json({message: "Token is not valid!"});
        }
        req.user = user;
        next();
    })
}

export default authenticate;