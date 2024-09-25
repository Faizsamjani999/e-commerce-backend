const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token)
    {
        return res.status(401).json({message:"Unauthorized..."});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
}

const isAdmin = (req,res,next)=>{
    if(!req.user.isAdmin)
    {
        return res.status(403).json({message:"Access Denied..."})
    }
    next();
}

module.exports = {
    verifyToken,
    isAdmin
}