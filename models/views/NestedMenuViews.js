const CategoryTypes = require("../CategoryTypes");

const NestedMenuView = CategoryTypes.aggregate([
  {
    $lookup: {
      from: "menuitems",
      localField: "categoryId",
      foreignField: "categoryType",
      as: "menus"
    }
  },
  {
    $unwind: {
      path: "$menus",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "ingredients",
      localField: "menus.menuId",
      foreignField: "menuIds",
      as: "menus.ingredients"
    }
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" }, // Keep CategoryType fields
      isActive: { $first: "$isActive" }, // Keep CategoryType fields
      description: { $first: "$description" }, // Keep CategoryType fields
      categoryId: { $first: "$categoryId" }, // Keep CategoryType fields
      categoryValue: { $first: "$categoryValue" }, // Keep CategoryType fields
      menus: { $push: {
        $cond: {
          if: "$menus.isActive",
          then: {
            id: "$menus._id",
            itemName: "$menus.itemName",
            rating: "$menus.rating",
            price: "$menus.price",
            description: "$menus.description",
            veg: "$menus.veg",
            image: "$menus.image",
            tag: "$menus.tag",
            info: "$menus.info",
            isActive: "$menus.isActive",
            menuId: "$menus.menuId",
            categoryType: "$menus.categoryType",
            ingredients: "$menus.ingredients",
            dressing: { $ifNull: ["$menus.dressing" , ""] },    
          },
          else: "$REMOVE"
        }
      } }  // Push the transformed MenuItems into an array
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      description: 1,
      categoryId: 1,
      isActive: 1,
      categoryValue: 1,
      menus: {
        $filter: {
          input: "$menus",
          as: "menu",
          cond: { $ne: ["$$menu", null] }
        }
      }
    }
  }
]);

module.exports = NestedMenuView;
