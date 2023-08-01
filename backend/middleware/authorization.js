function authorization(req, res, next) {
  if (
    // make sure we exclude checking preflight requests as they cant have authorization headers
    req.get("Authorization") !== process.env.SECRET &&
    req.method !== "OPTIONS"
  ) {
    res.status(403).json({ message: "Unauthorized request" });
  } else {
    next();
  }
}

module.exports = authorization;
