const jwtService = require("../Services/jwtService");
let authMW = (req, res, next) => {
  if (req.cookies.token) {
    req.user = jwtService.verifyToken(req.cookies.token);
  } else {
    req.user = null;
  }
  next();
};

let requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};
let requireAdminAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.username != "admin") {
    return res.redirect("/login");
  }
  next();
};

module.exports = { authMW, requireAuth, requireAdminAuth };
