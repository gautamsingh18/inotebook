const JWT_SECRET_KEY = "*#*#1234*#*#";
const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const authToken = req.header("auth-token");
  if (!authToken) {
    return res.status(401).send("please login");
  }
  const data = jwt.verify(authToken, JWT_SECRET_KEY);
  req.user = data.user;
  next();
};

module.exports = fetchUser;
