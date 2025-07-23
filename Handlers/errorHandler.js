const errorHandler = (error, req, res, next) => {
  if (error) {
    if (error.message) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  } else {
    next();
  }
};

module.exports = errorHandler;
