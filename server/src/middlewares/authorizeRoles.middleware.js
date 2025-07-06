import { ApiError } from "../utils/apiError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied: ${req.user.role} not allowed`)
      );
    }
    next();
  };
};
