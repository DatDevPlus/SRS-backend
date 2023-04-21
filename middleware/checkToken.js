import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ success: false, message: "token not found" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const expTime = decoded.exp;
    if (Date.now() >= expTime * 1000) {
      const user_id = decoded.userId;
      const accessToken = jwt.sign(
        { userId: user_id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
      );
      req.userId = decoded.userId;
      return res
        .status(200)
        .json({ message: "Token has expired", accessToken });
    } else {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
