import jwt from "jsonwebtoken";
import { User } from "../model/users.js";

const auth = async (req, res, next) => {
    try {
        let tokenData = req.headers.authorization;
        let token;
        if (tokenData && tokenData.startsWith('Bearer ')) {
            token = tokenData.split(' ')[1];
        } else {
            return res.status(401).json({
                status: 'failed',
                msg: 'No token provided'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Token verification failed'
            });
        }

        // Find the user by ID from the token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                status: 'failed',
                msg: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
};


export{auth}