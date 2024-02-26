const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token,"maryam");
      console.log(decodedToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  };



module.exports.isAdmin = (req, res, next) => {
    if (req.user.role == "admin") {
      next();
    } else {
      let error = new Error("you are not authorized");
      error.statusCode = 403;
      next(error);
    }
  };

  
module.exports.isAdminOrTeacher = (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else if (
        req.user.role === "teacher" &&
      (req.body._id === req.user._id || req.params.id === req.user._id)
    ){
      next();
    } else {
      let error = new Error("you are not authorized");
      error.statusCode = 403;
      next(error);
    }
  };
  

  