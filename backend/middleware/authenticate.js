const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        // if (!rootUser) {
        //     throw new Error("User not found");
        // }
        //req.rootUser = rootUser;
        //req.token = token;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send("UnAuthorized No Token Provided")
    }
}

module.exports = Authenticate;