const uploadController = require("../controllers/upload-controller");
const upload = require("../middleware/upload");
const tokenVerification = require("../middleware/token-verification");

const router = require("express").Router();

router.post(
  "/",
  [tokenVerification, upload.single("file")],
  uploadController.uploadFile
);
router.get("/", [tokenVerification], uploadController.getFile);

module.exports = router;
