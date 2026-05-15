import * as authService from './auth.service.js'
import ApiResponse from '../../common/utils/api-response.js';

const register = async (req, res) => {
    const user = await authService.register(req.body);
    // console.log("user create = ", user)
    ApiResponse.created(res, "Registration Success", user)
}

const login = async (req, res) => {
    // const { email, password } = ;
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    // console.log("email = ", req.body)
    // console.log("user = ", user);
    // console.log("accessToken = ", accessToken);
    // console.log("refreshToken = ", refreshToken);


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000     // 7days
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000     // 15 min
    });

    ApiResponse.ok(res, "Login Successful", { user, accessToken })
}

const logout = async (req, res) => {
    await authService.logout(req.user._id);
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken")
    ApiResponse.ok(res, "Logout Successful")
}

const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken } = await authService.refresh(token);
  ApiResponse.ok(res, "Token refreshed", { accessToken });
};

const getMe = async (req, res) => {
    const user = await authService.getMe(req.user._id);
    ApiResponse.ok(res, "User Fetched", user)
}

const verifyEmail = async (req, res) => {
    const token = await req.params.token;
    const user = await authService.verifyEmail(token);
    ApiResponse.ok(res, "Email verified");
}

const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email);
  ApiResponse.ok(res, "Password reset email sent");
};

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  ApiResponse.ok(res, "Password reset successful");
};

export { register, login, logout, refreshToken, getMe, verifyEmail, forgotPassword, resetPassword }