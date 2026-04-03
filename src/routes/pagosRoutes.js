const express = require("express");
const { putPago, removePago } = require("../controllers/pagosController");

const router = express.Router();
router.put("/:pagoId", putPago);
router.delete("/:pagoId", removePago);

module.exports = router;
