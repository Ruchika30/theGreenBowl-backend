const CategoryTypes = require("../../models/CategoryTypes");

const CategoryTypesView = CategoryTypes.aggregate([
	{
		$project: {
			id: "$_id",
			name: 1,
			categoryId: 1,
			description: 1,
			isActive: 1,
			categoryValue: { $ifNull: ["$categoryValue", ""] },
			_id: 0,
			categoryOrder: { $ifNull: ["$categoryOrder", null] },
		},
	},
	{
		$sort: {
			categoryOrder: 1,
		},
	},
]);

module.exports = CategoryTypesView;
