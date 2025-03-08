const router = require("express").Router();
const authRoutes = require("./Auth.route");
const categoryRoutes = require("./Category.route");


router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);


router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
