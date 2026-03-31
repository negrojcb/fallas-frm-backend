const express = require("express");
const {
  getFalleros,
  getFallero,
} = require("../controllers/fallerosController");

const router = express.Router();

router.get("/", getFalleros);
router.get("/:id", getFallero);

module.exports = router;
