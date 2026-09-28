import jsonwebtoken from "jsonwebtoken";

/**req  → the incoming request
res  → the response we can send
next → function that lets the request continue */

 const authMiddleware =(req,res,next)=>{
    console.log("🔥 AUTH MIDDLEWARE HIT");

    try{
    const authHeader=req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({
        error: "Authorization header missing"
    });
}


    const token = authHeader.split(" ")[1];
    console.log("SERVER TIME:", Math.floor(Date.now() / 1000));
    console.log("TOKEN DATA:", jsonwebtoken.decode(token));
    //verify jwt
     const decoded = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET
        );
            req.user = decoded;
            next();

   
}catch(error){
       console.log("JWT ERROR:", error.name);
    console.log("JWT MESSAGE:", error.message);

return res.status(401).json({
            error: "Invalid or expired token"
        });
}
}
export default authMiddleware;