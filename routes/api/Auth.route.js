const router = require("express").Router();

const register = require("../../controllers/auth/register");
const me = require("../../controllers/me");
const loginUser = require("../../controllers/auth/login");
const resetPassword = require("../../controllers/auth/resetPassword");
const verifyOtp = require("../../controllers/auth/verifyOTP");
const sendOtp = require("../../controllers/auth/sendOtp");
const registerOtp = require("../../controllers/auth/registerOtp");
const verifyDirectOTP = require("../../controllers/auth/verifyDirectOTP");
const updateProfile = require("../../controllers/auth/updateProfile");
const updatePassword = require("../../controllers/user/updatePassword");
const forgotPassword = require("../../controllers/auth/forgotPassword");
const newPassword = require("../../controllers/auth/newPassword");
const updateRole = require("../../controllers/auth/updateRole");
const changePhoto = require("../../controllers/auth/changePhoto");

router.post("/me", me);
router.post("/register", register);
router.post("/registerOtp", registerOtp);
router.put('/users/photo', changePhoto);
router.post("/update", updateProfile);
router.post("/updatePassword", updatePassword);
router.post("/login", loginUser);

router.post("/forgotPassword", forgotPassword);


router.patch("/newPassword", newPassword);
router.post("/sendOtp", sendOtp);
router.put("/resetPassword/:token", resetPassword);
router.post("/verifyOtp", verifyOtp);
router.post("/verifyDirectOtp", verifyDirectOTP);
router.post("/updateRole", updateRole);
router.put("/updateProfile", updateProfile);


module.exports = router;
