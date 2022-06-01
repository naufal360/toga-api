const express = require("express");
const tanamanController = require("../controllers/tanamanController");

const router = new express.Router();

router.post("/post", tanamanController.postTanaman);
router.get("/get", tanamanController.getTanaman);
router.get("/getName", tanamanController.getTanamanByName);
router.put("/update", tanamanController.updateTanaman);
router.delete("/delete", tanamanController.deleteTanaman);

module.exports = router;