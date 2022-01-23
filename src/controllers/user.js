const { users, feeds, follows } = require("../../models");
const Joi = require("joi");

exports.getUsers = async (req, res) => {
  try {
    // select all users
    const user = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    // find user by id
    const { id } = req.params

    // edit user
    await users.update(req.body, {
      where: {
        id
      }
    });

    res.send({
      status: 'success',
      message: `User id: ${id} has been successfully updated`,
      data: 'req.body'
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // find user by id params
    const { id } = req.params;

    // delete user
    await user.destroy({
      where: {
        id
      }
    });

    res.send({
      status: 'success',
      message: `User id: ${id} has been successfully updated`,
      data: {
        id
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error'
    });
  }
};

exports.getFollowers = async (req, res) => {
  try {
  } catch (error) {}
};

exports.getFollowing = async (req, res) => {
  try {
  } catch (error) {}
};
