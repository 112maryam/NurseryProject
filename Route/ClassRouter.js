const express =require("express");
const classValidation=require("../middleware/validations/classValidation");
const validation=require("../middleware/validations/validationMw");
const authMiddleWare = require("../middleware/authenticationMiddleware");
const classController=require("./../Controller/ClassController");
const router =express.Router();

router.route("/class")
      
      .get(authMiddleWare.isAdmin,
            classController.getAllClass)

      .post(classValidation.getSpecifiedclassById,
            validation,
            classController.addNewClass)

      .put(classValidation.getSpecifiedclassById,
            validation,
            classController.updateClass)

      .delete(classValidation.deleteSpecifiedClassById,
            validation,
            classController.deleteClass);

router.route("/class/:id")
      .get(authMiddleWare.isAdmin,
            classValidation.getSpecifiedclassById,
            validation,
            classController.getClassById);

router.route("/class/:id/child")
      .get(classValidation.getSpecifiedclassById,
            validation,
            classController.getclassChildern);


router.route("/class/:id/teacher")
      .get(classValidation.getSpecifiedclassById,
            validation,
            classController.getclassTeacher);
      

module.exports=router;




