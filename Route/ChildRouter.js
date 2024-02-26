const express=require("express");
const childValidation=require("../middleware/validations/classValidation");
const validation=require("../middleware/validations/validationMw");
const authMiddleWare=require("../middleware/authenticationMiddleware");
const router=express.Router();
const Controller=require("./../Controller/ChildController");


  router.route("/child")
        .get(authMiddleWare.isAdmin,
          Controller.GetAllChildren)
        
        .post(authMiddleWare.isAdmin,
          childValidation.postValidationArr,
          validation,
          Controller.AddNewChild)

        .put(authMiddleWare.isAdmin,
          childValidation.putValidationArr,
          validation,
          Controller.UpdateChildUserData)

       .delete(authMiddleWare.isAdmin,
        validation,
        Controller.DeleteChild)


  router.route("/child/:id")  
     .get(authMiddleWare.isAdmin,
      validation,
      Controller.GetChildBYId)   

  



  module.exports=router;