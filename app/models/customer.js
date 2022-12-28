'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
      })
      this.hasMany(models.Product, { through: "orders" })
    }
  }
  Customer.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: DataTypes.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true, lowercase: true,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter Phone Number" },
        len: { args: [11,11], msg: 'Phone Number is invalid' },
        isInt: { args: true, msg: "You must enter Phone Number" },
      }
    },
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};