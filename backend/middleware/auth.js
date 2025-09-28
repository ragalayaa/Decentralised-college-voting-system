const jwt = require("jsonwebtoken");

// Verify token for any protected route
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded; // { adminId, role }
    next();
  });
};



// Verify Admin role
exports.verifyAdmin = (req, res, next) => {
  if (!req.user?.adminId) {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
};