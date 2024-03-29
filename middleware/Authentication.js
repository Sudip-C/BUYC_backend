const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "buyc", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID;
        next();
      } else {
        res.status(400).json({ msg: "Please Login..." });
      }
    });
  } else {
    res.status(400).json({ msg: "Please Login..." });
  }
};

module.exports = {
  authenticate,
};