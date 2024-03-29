const express = require("express");
const router = express.Router();
const MenuItems = require("../models/MenuItems");
const views = require("../models/views/MenuViews");
const NestedViews = require("../models/views/NestedMenuViews");

router.get("/", async (req, res) => {
	try {
		
		let menuItem = await NestedViews;

		if (menuItem) {
			for (let index = 0; index < menuItem.length; index++) {
				const element = menuItem[index];
				if(element.menus.length == 1){
					if(!Object.hasOwn(element.menus[0], 'itemName')){
						console.log("Counter 1");
						element.menus = [];
					}
				}
				
			}
			// menuItem = menuItem.sort((a, b) => a.categoryOrder - b.categoryOrder);
			res.json(menuItem);
		} else {
			res.status(204).send();
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/add", async (req, res) => {
	
	try {
		let { itemName, rating, price, description, veg, image, tag, info,isActive,categoryType,dressing } = req.body;
		MenuItems.createIndexes({ itemName: 1 }, { unique: true });
		let checker = await MenuItems.findOne({itemName:itemName})
		if(checker){
			res.status(409).send({ Message: "Menu Items Already Exists" });
			return;
		}
		// let menuId = await getDocumentCount();
		let menuItemsList = new MenuItems({
			itemName, rating, price, description, veg, image, tag, info,isActive,categoryType,dressing
		});
		await menuItemsList.save();
		res.status(200).send({ Message: "Menu Items Added Sucessfully" });
	} catch (err) {
		if (err.code == 11000)
			res.status(409).send({ Message: "Menu Items Already Exists" });
		else res.status(500).send(err);
	}
});

router.post('/update',async(req,res)=>{
    let {id} = req.body;
    MenuItems.findOneAndUpdate({_id: id},req.body,{new:true}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Menu Item Updated Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Updating Menu Item"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});

router.get("/getAll", async (req, res) => {
	try {
		
		let menuItem = await MenuItems.find();
		if (menuItem) {
			res.json(menuItem);
		} else {
			res.status(204).send();
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post('/delete',async(req,res)=>{
    let {id} = req.body;
    MenuItems.findOneAndDelete({_id: id}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Menu Item Deleted Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Deleting Menu Item"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});


async function getDocumentCount() {
    let count = await MenuItems.countDocuments();
    return count + 1;
}

module.exports = router;
