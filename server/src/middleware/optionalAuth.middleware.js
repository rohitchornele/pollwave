import jwt from "jsonwebtoken";
import User from "../modules/auth/auth.model.js";

const optionalAuth = async (
  req,
  res,
 next
) => {
  try {

    const authHeader =
      req.headers.authorization;

    // No token → continue as anonymous user
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return next();
    }

    // Extract token
    const token =
      authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(
      decoded.id
    ).select("-password");

    // Attach user if exists
    if (user) {
      req.user = user;
    }

    return next();

  } catch (error) {

    return next();
  }
};

export default optionalAuth;