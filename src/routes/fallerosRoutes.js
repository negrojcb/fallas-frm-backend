const express = require("express");
const {
  getFalleros,
  getFallero,
  postFallero,
  putFallero,
  toggleFalleroActiveStatus,
} = require("../controllers/fallerosController");

const router = express.Router();

router.get("/", getFalleros);
router.get("/:id", getFallero);
router.post("/", postFallero);
router.put("/:id", putFallero);
router.put("/:id/toggle-active", toggleFalleroActiveStatus);

module.exports = router;
