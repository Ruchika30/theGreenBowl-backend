const express = require("express");
const router = express.Router();

const menu = require("./menu");
const ingredients = require("./ingredients");
const categorytypes = require("./categorytypes");

router.use("/menu", menu);

router.use("/ingredients", ingredients);

router.use("/categorytype", categorytypes);

module.exports = router;
