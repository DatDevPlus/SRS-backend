import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const expTime = decoded.exp;
    if (Date.now() >= expTime * 1000) {
      return res
        .status(401)
        .json({ message: "Access token has expired", expTime: expTime * 1000 });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
export const refreshToken = (req, res) => {};
