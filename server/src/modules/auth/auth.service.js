
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "./utils/jwt.utils.js";
import User from "./auth.model.js";
import crypto from "crypto"
import ApiError from "../../common/utils/api-error.js";
import { sendVerificationEmail } from "../../common/utils/email/send-email.js";

const hashToken = (token) => {
    crypto.createHash("sha256").update(token).digest("hex")
}

const register = async ({ name, email, password, role }) => {

    const existing = await User.findOne({ email })

    if (existing) {
        throw ApiError.conflict("User with this email already exist")
    }

    const { rawToken, hashedToken } = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    // send an email to user with token : rawToken
    try {
        await sendVerificationEmail(email, rawToken);
    } catch (err) {
        console.error("Failed to send verification email:", err.message);
    }

    const userObj = user.toObject();

    delete userObj.password
    delete userObj.verificationToken

    return userObj;
}


const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    // console.log("user in service : ", email, password)

    if (!user) {
        throw ApiError.unAuthorized("Invalid Email or Password")
    }

    // check password
    const isMatch = await user.comparePassword(password);

    console.log("ismatch = ", isMatch)

    if (!isMatch) {
        throw ApiError.unAuthorized("Invalid email or password");
    }

    //optional
    // if (!user.isVerified) {
    //     throw ApiError.forbidden("Please verify your email before login")
    // }

    // console.log("UserID = ", user._id, user.role)

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    // console.log("AssceesToken = ", accessToken)

    const refreshToken = generateRefreshToken({ id: user._id })

    // console.log("Services token = ", accessToken, refreshToken)

    user.refreshToken = hashToken(refreshToken);

    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()

    // console.log("userobj = ", userObj)

    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken }
}


const refresh = async (token) => {

    if (!token) {
        throw ApiError.unAuthorized("Refresh token missing")
    }

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken")

    if (!user) {
        throw ApiError.unAuthorized("User not found")
    }

    if (user.refreshToken !== hashToken(token)) {
        throw ApiError.unAuthorized("Invalid refresh token")
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role })

    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashToken(refreshToken);

    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()

    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken }
}


const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, { refreshToken: null })
}


const forgotPassword = async (email) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw ApiError.notFound("User email not found")
    }

    const { rawToken, hashedToken } = generateResetToken()

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // try {
    //     await sendResetPasswordEmail(email, rawToken);
    // } catch (err) {
    //     console.error("Failed to send reset email:", err.message);
    // }

}

const resetPassword = async (token, newPassword) => {
    const hashedToken = hashToken(token);

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpire");

    if (!user) throw ApiError.badRequest("Invalid or expired reset token");

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
}


const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw ApiError.notFound("User not found.")
    }

    return user;
}

const verifyEmail = async (token) => {

    const trimmed = String(token).trim();
    if (!trimmed) {
        throw ApiError.badRequest("Invalid or expired verification token");
    }

    // DB stores SHA256(raw). Links / email use the raw token — we hash for lookup.
    // If you paste the hash from MongoDB into Postman, hashing again would not match;
    // so we also try a direct match on the stored value.

    const hashedInput = hashToken(trimmed);

    const user = await User.findOne({ verificationToken: hashedToken }).select("+verificationToken")

    if (!user) {
        user = await User.findOne({ verificationToken: trimmed }).select(
            "+verificationToken",
        );
    }

    if (!user) throw ApiError.badRequest("Invalid or expired verification token");
    await User.findByIdAndUpdate(user._id, {
        $set: { isVerified: true },
        $unset: { verificationToken: 1 },
    });

    return user;
}


export { register, login, refresh, logout, forgotPassword, resetPassword, getMe, verifyEmail };