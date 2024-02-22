const express = require("express");
const router = express.Router();
const Category = require("../models/CategoryTypes");
const categorytypeview = require("../models/views/CategoryTypeView");

router.get("/", async (req, res) => {
	try {
		// let CategoryList = await Category.find();
		let CategoryList = await categorytypeview;
		if (CategoryList) {
			res.json(CategoryList);
		} else {
			res.status(204).send();
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/add", async (req, res) => {
	let { name, description,isActive } = req.body;
	let checker = await Category.findOne({name:name})
	if(checker){
		res.status(409).send({ Message: "Category Already Exists" });
		return;
	}
	let CategoryList = new Category({
		name, description,isActive
	});

	try {
		await CategoryList.save();
		res.status(200).send({ Message: "Category Added Sucessfully" });
	} catch (err) {
		if (err.code == 11000)
			res.status(409).send({ Message: "Category Already Exists" });
		else res.status(500).send(err);
	}
});

router.post('/update',async(req,res)=>{
    let {id} = req.body;
    Category.findOneAndUpdate({_id: id},req.body,{new:true}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Category Updated Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Updating Category"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});

router.post('/delete',async(req,res)=>{
    let {id} = req.body;
    Category.findOneAndDelete({_id: id}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Category Deleted Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Deleting Category"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});

module.exports = router;
