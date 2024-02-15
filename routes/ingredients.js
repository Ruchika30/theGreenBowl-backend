const express = require("express");
const router = express.Router();
const Ingredients = require("../models/Ingredient");

router.get("/", async (req, res) => {
	try {
		let IngredientsList = await Ingredients.find();
		if (IngredientsList) {
			res.json(IngredientsList);
		} else {
			res.status(204).send();
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/add", async (req, res) => {
	let { name, price,menuIds,isActive } = req.body;

	let IngredientsList = new Ingredients({
		name, price,menuIds,isActive
	});

	try {
		await IngredientsList.save();
		res.status(200).send({ Message: "Ingredients Added Sucessfully" });
	} catch (err) {
		if (err.code == 11000)
			res.status(409).send({ Message: "Ingredients Already Exists" });
		else res.status(500).send(err);
	}
});

module.exports = router;
