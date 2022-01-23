'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //hasMany to feeds model
      users.hasMany(models.feeds, {
        as: "feeds",
        foreignKey: {
          name: "idUser",
        },
      });

      //hasMany to follows model
      users.hasMany(models.follows, {
        as: "followers",
        foreignKey: {
          name: "idFollower",
        },
      });

      //hasMany to follows model
      users.hasMany(models.follows, {
        as: "followings",
        foreignKey: {
          name: "idFollowing",
        },
      });
    }
  }
  users.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};