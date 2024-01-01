const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to athenticate token" });

    req.userId = decoded.id;

    console.log("@@@@@@@@@@@@@@@", decoded.id);

    next();
  });
};

module.exports = { requireAuth };
