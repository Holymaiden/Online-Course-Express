const jwt = require("jsonwebtoken");

/**
 * @author M. Fiqri Haikhar Anwar
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * middleware for check authentication
 */

async function authAdminMiddleware(req, res, next) {
  let auth = await authMiddleware("admin", req, res);
  if (auth.authorized) {
    return next();
  } else {
    return res.status(403).json({
      error: "not authorized",
    });
  }
}

async function authUserMiddleware(req, res, next) {
  let auth = await authMiddleware("user", req, res);
  if (auth.authorized) {
    return next();
  } else {
    return res.status(403).json({
      error: "not authorized",
    });
  }
}

async function authMiddleware(role, req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token == " ") {
    return res.status(401).json({
      error: 401,
      message: "Please Provide Token",
    });
  }

  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({
        error: err.message,
      });
    }

    let authorized = false;
    decode.data.role.forEach((element) => {
      if (element.role_name == role) {
        authorized = true;
      }
    });

    return (data = { authorized: authorized, user: decode.data });
  });
}

async function getUser(req, res) {
  let auth = await authMiddleware("default", req, res);
  return auth.user;
}

module.exports = {
  authAdminMiddleware,
  authUserMiddleware,
  authMiddleware,
  getUser,
};
