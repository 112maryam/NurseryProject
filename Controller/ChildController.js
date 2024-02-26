const { request } = require("http");
const mongoose =require("mongoose");
require("../model/ChildModel");
require("../model/ClassModel");
const Class = mongoose.model("classes");
const Child = mongoose.model("children");


exports.GetAllChildren=(req,res,next)=>{

   Child.find({})
     .then((data) => {
      if (!data) {
        let error = new Error("no childs to show");
        error.statusCode = 404;
        throw error;
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {next(error);});

}
    





exports.AddNewChild=(req, res, next)=>{
    new Child({
        fullname: request.body.fullname,
        address: request.body.address,
        level: request.body.level,
      })
        .save()
        .then((data) => {
          if (!data) {
            let error = new Error("can't add this child check your data");
            error.statusCode = 404;
            throw error;
          }
          response.status(200).json(data);
        })
        .catch((error) => {next(error);});
    }
    


exports.UpdateChildUserData=(req, res, next)=>{
    const id=req.body.id;
    Child.updateOne({_id:id},req.body)
    .then((data)=>{
        if(data.matchedCount === 0){
            error.statusCode=404;
            throw new Error("this child doesn't exist");
        }
        res.status(200).json({message:`update child`})
    })
    .catch((error) => {next(error);});
}


exports.DeleteChild=(req, res, next)=>{
    const id=req.body.id;
    Child.deleteOne({_id:id})
    .then((data)=>{
        if(data.deletedCount === 0){
            error.statusCode=404;
            throw new Error("this child doesn't exist");
        }
        res.status(200).json({message:`delete child`})
    })
    .catch((error) => {next(error);});
}


exports.GetChildBYId=(req, res, next)=>{

    Child.findById(req.params.id)
    .then((data) => {
      if (!data) {
        let error = new Error("this child doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => {next(error);});
    
}
