const mongoose =require("mongoose");

require("../model/TeacherModel");
require("../model/ClassModel");
const Class = mongoose.model("classes");
const teacher = mongoose.model("teachers");
const multer =require("multer");
const bcrypt =require("bcrypt");



exports.upload = multer({
    dest: "uploads/",
});

exports.addNewTeacher=(req,res,next)=>{
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    // req.body.image = req.file.path;
    new teacher({
      _id: req.body.id,
      fullname: req.body.fullname,
      password: hash,
      email: req.body.email,
      image: req.body.image,
    })
      .save()
      .then((data) => {
        if (!data) {
          const error = new Error("can't add teacher check your data");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => next(error));
  }



  
exports.getAllTeachers=(req,res,next)=>{
    teacher.find({})
    .then((data)=>{
        if(!data){
            res.status(200).json({message:`no teachers to show`})
        }
        res.status(200).json(data);
    })
    .catch((error) => {next(error);});
    
}



exports.updateTeacher=(req,res,next)=>{
    const id=req.body.id;
    teacher.updateOne({id:id},req.body)
    .then((data)=>{
        if(data.matchedCount === 0){
            error.statusCode=404;
            throw new Error("this teacher doesn't exist");
        }
        res.status(200).json({message:`update teacher`})
    })
    .catch((error) => {next(error);});
}



exports.deleteTeacher = (req,res,next)=> {
    teacher.deleteOne({ _id: req.body._id })
      .then((data) => {
        if (data.deletedCount === 0) {
          let error = new Error("this teacher id doesn't exist");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: " teacher deleted successfully" });
      })
      .catch((error) => next(error));

  }
  

  exports.getTeacherById = (req,res,next) => {
    teacher.findOne({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          let error = new Error("this teacher id doesn't exist");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(data);
      })
      .catch((error) => next(error));

  }

  exports.getAllSupervisor = (request, response, next) => {
    Class.find({}, { supervisor: 1, name: 1 })
      .populate("supervisor", { fullname: 1, email: 1 })
      .then((doc) => {
        if (!doc) {
          let error = new Error("no data to show");
          error.statusCode = 404;
          throw error;
        }
        response.status(200).json(doc);
      })
      .catch((err) => next(err));
  };




