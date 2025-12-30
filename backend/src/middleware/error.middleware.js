function errorHandler(err, req, res, next) {
  const status = err.statusCode || 400;

  if (err?.issues) {
    return res.status(422).json({
      message: "Validación fallida",
      issues: err.issues.map(i => ({ path: i.path.join("."), message: i.message })),
    });
  }

  res.status(status).json({ message: err.message || "Error" });
}

module.exports = { errorHandler };
