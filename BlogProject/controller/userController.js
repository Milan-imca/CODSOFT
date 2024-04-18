const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')

// to register new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation:
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please fill all the fields'
      });
    }

    //already existing user:
    const existingUser = await userModel.findOne({ email });
    if (existingUser) { 
      return res.status(401).send({
        success: false,
        message: 'User already exits'
      })
    }
    //hashing the password:
    const hashedPassword = await bcrypt.hash(password, 10);


    //new user:
    const newUser = new userModel({ username, email, password: hashedPassword })
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: 'New User created Successfully',
      newUser
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error in User Register!',
      success: false,
      error
    })
  }
};

//to loing user:
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation:
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: 'Please enter valid email or password'
      })
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'Email not registered!'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid username or password',
      })
    }
    return res.status(200).send({
      success: true,
      message: 'Login Successfully',
      user
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Logging in User',
      error
    })
  }

};

//to get all the users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: 'All the user data fetch Successfully!',
      users
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in user fetching',
      error
    })
  }
};

