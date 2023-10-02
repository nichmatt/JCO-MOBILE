const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log(err.name, "ini error name nya di error handler");
  console.log(err.message, "ini error message nya di error handler");

  let statusCode = 500;
  let message = "Internal Server Error";

  //   switch (err.message){}
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "Not Authorized") {
    statusCode = 401;
    message = "Not Authorized";
  }

  if (err.name === "Invalid Email/Password") {
    statusCode = 401;
    message = "Invalid email/password";
  }
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = { errorHandler };
