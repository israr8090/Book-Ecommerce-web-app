import jwt from 'jsonwebtoken'; //--imported jwt

//--auth middleware for decode token  and user authentication
const authMiddleware = async (req, res, next) => {
    //--stored token in veriable
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    };

    //--decode token and store user id in req.body.userId
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        // console.log(req.body)
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" }); 
    }
}

export default authMiddleware;