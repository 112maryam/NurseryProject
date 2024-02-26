const mongoose = require("mongoose");
require("../model/ClassModel");
const Class = mongoose.model("classes");



exports.getAllClass = (req, res, next) => {
    Class.find()
      .then((data) => {
        if (!data) {
          let error = new Error("no classes to show");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };

  exports.addNewClass = (req, res, next) => {
    new Class(req.body)
      .save()
      .then((data) => {
    
        if (!data) {
          let error = new Error("can't add this class check your data");
          error.statusCode = 404;
          throw error;
        }
        res.status(201).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };


  exports.updateClass = (req, res, next) => {
    Class.updateOne({ _id: req.body._id }, req.body)
      .then((data) => {
        if (data.matchedCount === 0) {
          let error = new Error(" class id doesn't exist");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };


  exports.deleteClass = (req, res, next) => {
    Class.deleteOne({ _id: req.body._id })
      .then((data) => {
        if (data.deletedCount === 0) {
          let error = new Error("this class doesn't exist");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: " class deleted successfully" });
      })
      .catch((error) => next(error));
  };
  
  exports.getClassById = (req, res, next) => {
    Class.findOne({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          let error = new Error("this class doesn't exist");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => next(error));
  };

  exports.getclassChildern = (req, res, next) => {
    console.log(req.params.id);
    Class.findOne({ _id: req.params.id }, { children: 1 })
      .populate("children", {
        fullname: 1,
        address: 1,
      })
      .then((data) => {
        if (!data) {
          let error = new Error("no data for children to show");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => next(error));
  };
  
  exports.getclassTeacher = (req, res, next) => {
    Class.findOne(
      { _id: req.params.id },
      { supervisor: 1, name: 1, _id: 1 }
    )
      .populate("supervisor", {
        fullname: 1,
        email: 1,
      })
      .then((data) => {
        if (!data) {
          let error = new Error("no data for teacher");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => next(error));
  };

