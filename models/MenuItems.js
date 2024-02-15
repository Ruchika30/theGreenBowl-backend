const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MenuInformationSchema = mongoose.Schema({
	energy:{
		type: String,
		required: false,
	},
	fats:{
		type: String,
		required: false,
	},
	protein:{
		type: String,
		required: false,
	},
	carbs:{
		type: String,
		required: false,
	},
});

const MenuItemsSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	veg: {
		type: Boolean,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	tag: {
		type: String,
		required: false,
	},
	info: {
		type: MenuInformationSchema,
        required: true
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	menuId:{
		type:Number,
		required:true
	}

});

;

const MenuItems = mongoose.model("MenuItems", MenuItemsSchema);



module.exports = MenuItems;