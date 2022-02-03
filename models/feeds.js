'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongsTo to users model
      feeds.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "idUser"
        }
      });
    }
  }
  feeds.init({
    fileName: DataTypes.STRING,
    caption: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feeds',
  });
  return feeds;
};