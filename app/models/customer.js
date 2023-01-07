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
      this.belongsTo(models.User, {
        through: "User_Roles",
        foreignKey: "userId",
        otherKey: "roleId"
      })

      this.hasMany(models.Order, { foreignKey: 'customerId' })
    }
  }
  Customer.init({
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true, lowercase: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
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