'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {
        foreignKey: "orderId",
      })
    }
  }
  Product.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    kind: DataTypes.STRING,
    uom: DataTypes.STRING,
    foto: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};