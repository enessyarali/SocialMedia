import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
 try {
    let token = req.header("Authorization");
    if(!token) {
        return res.status(403).send("Access Denied");
    }
    if(token.startsWith("Bearer ")) { //We are gonna pick up the token after the Bearer.
       token =   token.slice(7 ,tokens.length).trimLeft();
    }

    const verified = jwt.verify(token ,process.env.JWT_SECRET);
    req.user = verified;
    next(); // We have to provide the next function for the middleware so it moves to the next step of the function.
 } catch (error) {
    res.status(500).json({error : error.message})
 }
}