import jwt from 'jsonwebtoken'
import User from './auth.model.js'
import mongoose from 'mongoose';
import { verifyAccessToken } from './utils/jwt.utils.js';
import ApiError from '../../common/utils/api-error.js';


const authenticate = async (req, res, next) => {
    try {
        let token;

        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        } else if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw ApiError.unAuthorized("Not Authenticated")
        }


        const decoded = verifyAccessToken(token)

        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            throw ApiError.unAuthorized("USer no longer exist")
        }

        req.user = {
            _id: user._id,
            role: user.role,
            name: user.name,
            email: user.email
        }

        // console.log("user in middleware = ", user)

        next()

    } catch (error) {
        console.log("Auth middleware Error", error.message);
        if (error.name === "TokenExpiredError") {
            throw ApiError.unAuthorized("Session expired, login again")
        }

        throw ApiError.unAuthorized("Invalid Token, Not Authorized")
    }
}


const authorize = async (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw ApiError.forbidden("You do not have permission to perform this action");
        }

        next()
    }
}


export { authenticate, authorize }
