const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const { Navigate } = require('react-router-dom');
const jwtSecret="Mynameis"

router.post(
  '/createuser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {  

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({  
        name: req.body.name,
        password: hashedPassword, 
        email: req.body.email,
        location: req.body.location
      }).then(user =>{
        const data = {
          user:{
            id:user.id
          }
        }
        const authToken=jwt.sign(data,jwtSecret);
        res.json({ success: true, authToken})
      })     
    } 
    catch (error) {
      console.log(error);
      res.json({ success: false });
    }
})


router.post(
  '/loginUser',
  [
    body('email').isEmail(),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password} = req.body;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({success, errors: 'Invalid credentials' });
      }
 
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(400).json({ success, errors: 'Invalid credentials' });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      success = true;
      const authToken = jwt.sign(data,jwtSecret);
      res.json({ success, authToken});
    }
      catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;