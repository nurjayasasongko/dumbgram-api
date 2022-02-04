const { users, messages } = require('../../models')
const { Op } = require('sequelize');
const Joi = require('joi');

exports.addMessage = async (req, res) => {
  try { 
    // variable declare
    const id = req.params.id;
    const idUser = req.user.id;
    const message = req.body.message;

    //validation schema
    const schema = Joi.object({
      message: Joi.string().required()
    })
    .validate(req.body);
    
    //error
    const { error }  = schema
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message
      });
    }

    //check user recipient id
    const check = await users.findOne({
      where: {
        id
      }
    });
    if (!check) {
      return res.status(400).send({
        status: 'failed',
        message: `User with id ${id} not exist`
      })
    }

    //make a message
    const data = await messages.create({
      sender: idUser,
      recipient: id,
      message
    });

    //send respon
    const dataUser = await messages.findOne({
      where: {
        id: data.id
      },
      include: {
        model: users,
        as: 'idRecipient',
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['sender', 'recipient', 'createdAt', 'updatedAt']
      }
    });

    res.status(200).send({
      status: 'success',
      data: {
        message: dataUser
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

exports.getMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const idUser = req.user.id;

    //check user recipient id
    const check = await users.findOne({
      where: {
        id
      }
    });
    if (!check) {
      return res.status(400).send({
        status: 'failed',
        message: `User with id ${id} not exist`
      });
    }

    const message = await messages.findAll({
      where: {
        [Op.or]: [
          {
            sender: check.id,
            recipient: idUser
          },
          {
            sender: idUser,
            recipient: check.id
          }
        ]
      },
      include: {
        model: users,
        as: 'idSender',
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['sender', 'recipient']
      }
    });

    res.status(200).send({
      status: 'success',
      data: {
        message
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