const mongoose = require("mongoose");


const IngredientsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	menuIds:[Number],
	isActive:{
		type:Boolean,
		required:true
	}
});

const Ingredients = mongoose.model("Ingredients", IngredientsSchema);

module.exports = Ingredients;
