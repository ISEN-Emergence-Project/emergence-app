const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const authJwt = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message: "No token provided !",
            originalUrl: res.originalUrl
        });
    }
    jwt.verify(token,config.secret,(err,decoded) => {
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            });
        }
        req.id=decoded.id;
        next();
    });
};

module.exports = authJwt;