const express = require('express');
const { getAllUsers, registerUser, loginUser } = require('../controller/userController');

//router's object :
const router = express.Router();
//router for create user:
router.post('/register',registerUser);

// route for getting the user: 
router.get('/all-users', getAllUsers);



//router  for user login 
router.post('/login',loginUser);


module.exports = router;