'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {
        foreignKey: "customerId",
        otherKey: "roleId"
      }),
      this.hasMany(models.Product, {
        foreignKey: "productId",
      })
    }
  }
  Order.init({
    id: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};