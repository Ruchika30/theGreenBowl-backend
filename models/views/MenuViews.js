
const MenuItems = require("../../models/MenuItems");

const MenuView = MenuItems.aggregate([
    {
      $lookup: {
        from: 'ingredients',
        localField: 'menuId',
        foreignField: 'menuIds',
        as: 'addOnIngredients'
      }
    },
    {
      $project: {
        "itemName":1,
        "rating":1,
        "price":1,
        "description":1,
        "veg":1,
        "image":1,
        "tag":1,
        "info":1,
        "isActive":1,
        "menuId":1,
        "addOnIngredients.name":1,
        "addOnIngredients.price":1,
        "addOnIngredients.isActive":1
        
      },
    },
  ]);


 module.exports = MenuView;