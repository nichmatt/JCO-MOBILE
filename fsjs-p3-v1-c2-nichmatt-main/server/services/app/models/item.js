"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, { foreignKey: "categoryId" });
      Item.hasMany(models.Ingredient, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: "name is required",
          },
          notNull: {
            message: "name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: "description is required",
          },
          notNull: {
            message: "description is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            message: "price is required",
          },
          notNull: {
            message: "price is required",
          },
          min: {
            args: 5000,
            message: "price must be more than 5000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: "image is required",
          },
          notNull: {
            message: "image is required",
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: "authorId is required",
          },
          notNull: {
            message: "authorId is required",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            message: "categoryId is required",
          },
          notNull: {
            message: "categoryId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
