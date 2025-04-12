const router = require("express").Router();
const authRoutes = require("./Auth.route");
const uploadFile = require('../../controllers/upload/upload');


router.use("/auth", authRoutes);
router.post('/upload', uploadFile);



router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
