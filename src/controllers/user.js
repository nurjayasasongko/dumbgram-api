const { users, follows } = require("../../models");
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
      data: req.body
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
    await users.destroy({
      where: {
        id
      }
    });

    res.send({
      status: 'success',
      message: `User id: ${id} has been successfully deleted`,
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

exports.addFollows = async (req, res) => {
  try {
    const { body } = req
    await follows.create(body)

    res.send({
      status: 'success',
      message: 'Follow Succes'
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
    // get follower by id
    const id = req.params.id;
    const idUser = await users.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['email', 'username', 'password', 'fullname', 'image', 'bio', 'createdAt', 'updatedAt']
      },
      include: {
        model: follows,
        as: 'followers',
        include: {
          model: users,
          as: 'followers',
          attributes: {
            exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
          }
        },
        attributes:{
          exclude: ['idFollower', 'idFollowing', 'createdAt', 'updatedAt']
        }
      }
    });

    res.send({
      status: 'success',
      idUser
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error'
    });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    // get following by id
    const id = req.params.id;
    const idUser = await users.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['email', 'username', 'password', 'fullname', 'image', 'bio', 'createdAt', 'updatedAt']
      },
      include: {
        model: follows,
        as: 'followings',
        include: {
          model: users,
          as: 'followings',
          attributes: {
            exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
          }
        },
        attributes:{
          exclude: ['idFollower', 'idFollowing', 'createdAt', 'updatedAt']
        }
      }
    });

    res.send({
      status: 'success',
      idUser
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error'
    });
  }
};
