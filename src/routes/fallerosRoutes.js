const express = require("express");
const {
  getFalleros,
  getFallero,
  postFallero,
} = require("../controllers/fallerosController");

const router = express.Router();

router.get("/", getFalleros);
router.get("/:id", getFallero);
router.post("/", postFallero);

module.exports = router;
