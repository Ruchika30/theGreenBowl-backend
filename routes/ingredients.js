const express = require("express");
const router = express.Router();
const Ingredients = require("../models/Ingredient");

router.get("/", async (req, res) => {
	try {
		const IngredientsList = await Ingredients.aggregate([
			{
				$project: {
					id: "$_id",
					name: 1,
					price: 1,
					menuIds: 1,
					isActive: 1,
					_id: 0,
				},
			},
		]);
		// let IngredientsList = await Ingredients.find();
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

router.post('/update',async(req,res)=>{
    let {id} = req.body;
    Ingredients.findOneAndUpdate({_id: id},req.body,{new:true}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Ingredient Updated Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Updating Ingredient"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});

router.post('/delete',async(req,res)=>{
    let {id} = req.body;
    Ingredients.findOneAndDelete({_id: id}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Ingredient Deleted Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Deleting Ingredient"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});

module.exports = router;
