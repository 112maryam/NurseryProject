const express=require("express");
const teacherValidation=require("../middleware/validations/teacherValidation");
const authMiddleWare=require("../middleware/authenticationMiddleware");
const validation=require("../middleware/validations/validationMw");
const teacherController=require("../Controller/TeacherController");
const router=express.Router();



router.route("/teachers")
     
     .get(authMiddleWare.auth,
      authMiddleWare.isAdminOrTeacher,
      teacherController.getAllTeachers)

      .post(teacherController.upload.single("image"),
            teacherController.addNewTeacher)

      
      .put(teacherValidation.putValidationArr,
          validation, 
          teacherController.updateTeacher)
            
      .delete(teacherController.deleteTeacher,
            teacherValidation.deleteSpecifiedTeacherById,
            validation);


 router.route("/teachers/supervisors")
       .get(authMiddleWare.isAdminOrTeacher,
            teacherController.getAllSupervisor);


router.route("/teachers/:id")
      .get(authMiddleWare.isAdminOrTeacher,
            validation,
            teacherController.getTeacherById);


  module.exports=router;



