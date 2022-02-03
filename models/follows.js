'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongsTo to users model
      follows.belongsTo(models.users, {
        as: "followers",
        foreignKey: {
          name: "idFollower"
        }
      });

      // belongsTo to users model
      follows.belongsTo(models.users, {
        as: "followings",
        foreignKey: {
          name: "idFollowing"
        }
      });
    }
  }
  follows.init({
    idFollower: DataTypes.INTEGER,
    idFollowing: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'follows',
  });
  return follows;
};