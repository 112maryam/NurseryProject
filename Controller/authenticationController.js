const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const TeacherModel = mongoose.model("teachers");

exports.login = (request, response, next) => {
    if (request.body.role === "teacher") {
      TeacherModel.findOne({
        email: request.body.email,
        // password: hash,
      })
        .then((teacherdoc) => {
          // console.log("this data", data);
          if (!teacherdoc) {
            let error = new Error("not authenicated");
            error.statusCode = 401;
            throw error;
          }
  
         
          if (bcrypt.compareSync(request.body.password, teacherdoc.password)) {
            const token = jwt.sign(
              {
                _id: teacherdoc._id,
                email: teacherdoc.email,
                role: "teacher",
              },
              "maryam",
              { expiresIn: "1h" }
            );
            // let tok = jwt.verify(token, "kareem");
            // console.log(tok);
            response.status(200).json({ message: "login successfully", token });
          } else {
            let error = new Error(" you are not authenicated");
            error.statusCode = 401;
            throw error;
          }
        })
        .catch((error) => {
          next(error);
        });
    } else {
      if (request.body.role === "admin") {
        if (
          request.body.email === "admin1@gmail.com" &&
          request.body.password === "adminN_1235@nursery"
        ) {
          const token = jwt.sign(
            {
              _id: "123onlyadmin",
              password: request.body.password,
              email: request.body.email,
              role: "admin",
            },
            process.env.secretKey,
            { expiresIn: "1h" }
          );
  
          response.status(200).json({ message: "login successfully", token });
        } else {
          let error = new Error("not authenicated");
          error.status = 401;
          next(error);
        }
      } else {
        let error = new Error("not authenicated");
        error.status = 401;
        next(error);
      }
    }
  };
  