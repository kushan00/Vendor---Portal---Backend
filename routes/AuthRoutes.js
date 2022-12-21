const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const { registerAdmin ,authAdmin , loginAdmin , updateAdmin } = require("../controllers/AuthControllers.js"); 


router.post("/signup",
	[
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter password with 8 or more characters"
		).isLength({ min: 8 }),
	],
	registerAdmin);

router.get("/auth", auth,authAdmin);

router.post(
	"/signin",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	loginAdmin);

router.put("/update-admin/:id",updateAdmin);


module.exports = router;
