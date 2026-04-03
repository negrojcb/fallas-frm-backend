const express = require("express");
const {
  getFalleros,
  getFallero,
  postFallero,
  putFallero,
  toggleFalleroActiveStatus,
} = require("../controllers/fallerosController");
const { postPago } = require("../controllers/pagosController");

const router = express.Router();

router.get("/", getFalleros);
router.get("/:id", getFallero);
router.post("/", postFallero);
router.put("/:id", putFallero);
router.put("/:id/toggle-active", toggleFalleroActiveStatus);
router.post("/:id/pagos", postPago);

module.exports = router;
