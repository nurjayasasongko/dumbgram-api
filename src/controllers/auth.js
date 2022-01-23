const { users } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register handler
exports.register = async (req, res) => {
  try {
    // validation schema
    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      username: Joi.string().min(6).required(),
      fullname: Joi.string().min(6).required(),
      password: Joi.string().min(8).required()
    });

    // error
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: "failed",
        error: {
          message: error.details[0].message,
        },
      });
    }

    // already user exist checking
    const userExist = await users.findOne({
      where: {
        email: req.body.email
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Account already exist",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // new user
    const newUser = await users.create({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      password: hashedPassword
    });

    // generate token
    const token = jwt.sign(
      {
        id: newUser.id
      },
      process.env.TOKEN_KEY
    );

    res.status(200).send({
      status: 'success',
      data: {
        fullname: newUser.fullname,
        username: newUser.username,
        token,
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
