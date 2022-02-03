'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //hasMany to users model
      messages.belongsTo(models.users, {
        as: "idSender",
        foreignKey: {
          name: "sender",
        },
      });

      messages.belongsTo(models.users, {
        as: "idRecipient",
        foreignKey: {
          name: "recipient",
        },
      });
    }
  }
  messages.init({
    message: DataTypes.STRING,
    sender: DataTypes.INTEGER,
    recipient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'messages',
  });
  return messages;
};