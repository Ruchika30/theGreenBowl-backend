const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},	
	categoryId:{
		type:Number,
		required:false	
	},
	description:{
		type:String,
		required:false
	},
	isActive:{
		type:Boolean,
		required:true
	},
	categoryValue:{
		type:String,
		required:true,
	},
	categoryOrder:{
		type:Number,
		required:false,
	},


});

CategorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

const CategoryTypes = mongoose.model("CategoryTypes", CategorySchema);



module.exports = CategoryTypes;
