const router = require("express").Router();
const authRoutes = require("../routes/auth.routes");
const uploadRoutes = require("../routes/upload.routes");

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
