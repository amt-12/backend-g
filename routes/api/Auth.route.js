const router = require("express").Router();

// const { googleAuth } = require("../../controllers/auth/authController");
const register = require("../../controllers/auth/register");
const checkAuth = require("../../middlewares/checkAuth");

router.post("/register",checkAuth, register);
// router.post("/upload", upload);
// router.post("/google", googleAuth);


module.exports = router;
