const DataTypes = require("sequelize");
const sequelize = require("../configs/db");

const Payments = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Payments;
