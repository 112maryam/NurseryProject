const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
    try {
      console.log(req.headers);
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token,"maryam");
      console.log(token);
      console.log(decodedToken);
      req.user = decodedToken;  
      next();
    } catch (error) {
      next(error);
    }
  };



exports.isAdmin = (req, res, next) => {
    if (req.user.role == "admin") {
      next();
    } else {
      let error = new Error("you are not authorized");
      error.statusCode = 403;
      next(error);
    }
  };

  
exports.isAdminOrTeacher = (req, res, next) => {
  console.log(req.user.role);

    if (req.user.role === "admin") {
      next();
    } else if (
        req.user.role === "teacher"){
      next();
    } else {
      let error = new Error("you are not authorized");
      error.statusCode = 403;
      next(error);
    }
  };
  

  