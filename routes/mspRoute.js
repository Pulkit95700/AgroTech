const express = require("express");
const { getMSPs } = require("../controllers/mspController");

const router = express.Router();

router.get("/", getMSPs);

module.exports = router;