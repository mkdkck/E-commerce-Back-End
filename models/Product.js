const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validator:{
        isDecimal: true,
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      defaultValue: '10',
      allowNull: false,
      validator:{
        isNumeric: true,
      }
    },
    category_id:{
      type: DataTypes.INTEGER,
      references:{
        model: 'category',
        key: 'id',
        unique: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
