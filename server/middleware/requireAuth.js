const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secret = process.env.SECRET_KEY || process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined in environment variables");
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded._id || decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = authMiddleware;
