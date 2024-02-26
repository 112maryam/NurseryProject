const express = require("express");
const authController = require("../Controller/authenticationController");
const validator = require("../middleware/validations/validationMw");
const authValidation = require("../middleware/validations/authenticateValidation");

const router = express.Router();

router.post(
  "/login",
  authController.login
);



module.exports = router;