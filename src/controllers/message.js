const { users, messages } = require('../../models')

exports.addMessage = async (req, res) => {
  try { 
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
    
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};