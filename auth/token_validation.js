const {verify } = require("jsonwebtoken");

module.exports ={
    checkToken: (req,res,next) => {
    let token= req.get("authorization");
        //console.log({token})
    if(token){
      token = token.slice(7);
      verify(token,"qwe1234",(err,decoded) => {
        if(err){
            return res.status(403).json({
                success: 0,
                message:"invalid token"
            });
        }else{
            next();
        }
      });
    }else{
        res.json({
            success:0,
            message:" Access denied! unauthorized user"
        })
    }

    }
}

