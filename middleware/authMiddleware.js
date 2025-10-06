const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // ✅ STEP 2: Add these logs to debug
  console.log("🔍 Authorization Header:", authHeader);
  console.log("🔍 JWT_SECRET from .env:", process.env.JWT_SECRET);

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ Also log the token and the decoded content
    console.log("🔐 Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
