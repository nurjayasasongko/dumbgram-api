const { users, feeds, likes, comments } = require("../../models");

exports.addFeed = async (req, res) => {
  try {
    // make new feed
    const newFeed = await feeds.create({
      caption: req.body.caption,
      fileName: req.files.filename,
    });

    // show newFeed
    const feed = await feeds.findOne({
      where: {
        id: newFeed.userId,
      },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "like"],
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        feed,
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

exports.getFeedByFollow = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
