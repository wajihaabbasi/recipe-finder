const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Full Auth Header:", authHeader); // Debug 1

  const token = authHeader && authHeader.split(' ')[1];
  console.log("Extracted Token:", token); // Debug 2

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Payload:", decoded);
    req.user = decoded.userId; // Attach user_id to the request object
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = verifyToken;
