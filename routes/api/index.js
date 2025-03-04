const router = require("express").Router();
const authRoutes = require("./Auth.route");


router.use("/auth", authRoutes);


router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
