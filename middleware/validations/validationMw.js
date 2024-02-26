const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  

  let result = validationResult(req);

  if (result.errors.length != 0) {
    let errorMessage = result.errors.reduce(
      (current, object) => current + object.msg + ",",
      ""
    );

    let error = new Error(errorMessage);
    error.statusCode = 442;
    console.log(error + "");
    throw error;
  }
  next();
  
};
