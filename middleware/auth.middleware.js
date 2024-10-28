import jwt from "jsonwebtoken";

export const authMiddleware = async (request, response, next) => {
  const token = request.cookies.token;
  if (!token)
    return response.status(401).json({
      success: false,
      message: "No token provided. Authorization failed.",
    });

  try {
    const decode = jwt.verify(token, "CLIENT_SECRET_KEY");
    request.user = decode;
    next();
  } catch (error) {
    response.status(401).json({
      success: false,
      message: "Authorization failed.",
    });
  }
};
