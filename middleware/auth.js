import jwt from "jsonwebtoken";

export const VerifyToken = (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const expTime = decoded.exp;
    req.userId = decoded.userId;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Access token not found" });
    if (expTime)
      return res
        .status(200)
        .json({ message: "Exp time", expTime: expTime * 1000 });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
export const refreshToken = (req, res) => {};
