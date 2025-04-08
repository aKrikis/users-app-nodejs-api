const { request, response } = require('../app');
const User = require('../models/user.model');
const userService = require('../services/user.services');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');

exports.findAll = async(request, response) => {
  console.log("Find all users from collection Users");

  try {
    // const result = await User.find();

    const result = await userService.findAll();
    response.status(200).json({status: true, data: result});

    logger.info("INFO, Success in reading all users")
  }catch (err) {
    console.log("Problem in reading users", err);
    
    logger.info("ERROR, Error in reading all users")

    response.status(200).json({status: false, data: err});
    
  }
}

exports.findOne = async(request, response) => {
  console.log("Find user with specific username");

  let username = request.params.username;

  try{
    //const result = await User.findOne({username: username});
    const result = await userService.findOne(username);

    if (result) {
      response.status(200).json({status: true, data: result});  
    } else {
      res.status(404).json({status: false, data: "User not exists."})
    }

  }catch (err) {
    console.log("Problem in finding user", err);
    response.status(400).json({status: false, data: err})
  }
}

exports.create = async(request, response) => {
  console.log('Create User');
  let data = request.body;
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltOrRounds)   //encrypted password

  const newUser = new User ({                    // einai User apo to Schema
    username: data.username,
    password: hashedPassword,
    name: data.name,
    surnmae: data.surname,
    email: data.email,
    address: {
      area: data.address.area,
      road: data.address.road
    }
  });
  
  try {
    const result = await newUser.save();

    response.status(200).json({status: true, data: result})
  }catch (err) {
    console.log("Problem in creating user", err);
    response.status(400).json({status: false, data: err});
  }
}

exports.update = async (request, response) => {
  const username = request.body.username

  console.log("Update user with username", username);

  const updateUser = {
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    address: {
      area: request.body.address.area,
      road: request.body.address.road
    }
  };

  try {
    const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true});
    response.status(200).json({status: true, data: result})
  } catch (err) {
    console.log("Problem in updating user", err);
    response.status(400).json({status:false, data: err});
  }
}

exports.deleteByUsername = async(request, response) => {
  const username = request.params.username
  console.log("Delete user with username", username);

  try {
    const result = await User.findOneAndDelete({username: username})
    response.status(200).json({status: true, data: result})
  } catch (err) {
    response.status(400).json ({status: false, data: err})
  }
}