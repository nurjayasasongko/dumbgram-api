const { users, feeds, likes, comments } = require("../../models");
const follows = require("../../models/follows");

exports.addFeed = async (req, res) => {
  try {
    const data = req.body
    
    // make new feed
    const newFeed = {
      ...data,
      idUser: req.user.id,
      fileName: req.files.image[0].filename,
    }
    await feeds.create(newFeed)
    
    res.status(200).send({
      status: "success",
      data: {
        newFeed,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFeedById = async (req, res) => {
  try {
    const id = req.params.id

    // show user
    const userFeed = await feeds.findAll({
      where: {
        idUser: id
      },
      attributes: {
        exclude: ['idUser', 'createdAt', 'updatedAt']
      },
      include: {
        model: users,
        as: 'user',
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      }
      
    })

    res.status(200).send({
      status: "success",
      data: {
        userFeed
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFeedByFollow = async (req, res) => {
  try {
    const id = req.params.id

    // show just following user
    let follower = [];
    follower = await follows.findAll({
      where: {
        idFollower: id
      }
    });

    let data = []

    for (i = 0; i < follower.length; i++) {
      const a = await feeds.findAll({
        where: {
          id: follower[i].idFollowing
        },
        include: {
          model: users,
          as: 'user',
          attributes: {
            exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
          }
        },
        attributes: {
          exclude: ['idUser', 'createdAt', 'updatedAt']
        }
      })
      data.push(a)
    }

    res.status(200).send({
      status: "success",
      data: {
        feed: data
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getAllFeed = async (req, res) => {
  try {
    const path = process.env.PATH_UPLOAD

    let feed = await feeds.findAll({
      include: {
        model: users,
        as: 'user',
        attributes: {
          exclude: ['bio', 'password', 'email', 'createdAt', 'updatedAt']
        }
      },
      order: [
        ['id', 'DESC'],
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    const parseJSON = JSON.parse(JSON.stringify(feed))

    feed = parseJSON.map(item => {
      return{
        ...item,
        image: path + item.fileName
      }
    })

    res.status(200).send({
      status: "success",
      data: {
        feed
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addLike = async (req, res) => {
  try {
    const { body } = req
    await likes.create(body)

    res.send({
      status: 'success',
      message: 'Like Success'
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const id = req.params.id
    const comment = await comments.findAll({
      attributes: {
        exclude: ['idFeed', 'idUser', 'createdAt', 'updatedAt']
      },
      include: {
        model: users,
        as: 'user',
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      where: {
        idFeed: id
      },
      order: [['id', 'DESC']]
    });

    res.status(200).send({
      status: 'success',
      data: {
        comment
      }
    })
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { body } = req
    await comments.create(body)

    res.send({
      status: 'success',
      message: 'Comment Success'
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
