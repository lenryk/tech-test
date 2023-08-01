function authorization(req, res, next) {
  if (req.get("Authorization") !== process.env.SECRET) {
    res.status(403).json({ message: "Unauthorized request" });
  } else {
    next();
  }
}

module.exports = authorization;
