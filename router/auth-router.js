const express = require("express")
const router = express.Router();
const authControllers = require("../controllers/auth-controller")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware");
const {signupScheme,loginSchema} = require("../validators/auth-validator");

// router.get("/",(req,res)=>{
//     res.status(200).send("Welcome to Abhishek's website using router");
// }) 

router.route("/").get(authControllers.home);

// basically once the signup scheme gets checked by the validator then only the form we will go to the auth controller 
router.route("/register").post(validate(signupScheme), authControllers.registration);

router.route("/login").post(validate(loginSchema),authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;