const express = require("express");
const medikasiController = require("../controllers/medikasiController");

const router = new express.Router();

router.post("/post", medikasiController.postMedikasi);
router.get("/get", medikasiController.getMedikasi);
router.get("/get/:_id", medikasiController.getMedikasiById);
router.get("/getName", medikasiController.getMedikasiByName);
router.put("/update", medikasiController.updateMedikasi);
router.delete("/delete", medikasiController.deleteMedikasi);

module.exports = router;