const express = require("express");
const router = express.Router();

const menu = require("./menu");
const ingredients = require("./ingredients");

router.use("/menu", menu);

router.use("/ingredients", ingredients);

module.exports = router;
