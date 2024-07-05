const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const connectDB = require('../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const { Navigate } = require('react-router-dom');
const jwtSecret="MynameisendtoendyoutubeChannel$#"

// Add body-parser middleware
//router.use(bodyParser.json());

router.post(
  '/CreateUser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await connectDB();

      const newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location
      });

      await newUser.save();
      

      res.json({ success: true });
      
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  '/LoginUser',
  [
    body('email').isEmail(),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await connectDB();

      const { email, password } = req.body;
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(400).json({ errors: 'Invalid credentials' });
      }

      const data={
        user:{
          id:userData.id
        }

      }
      const authToken=jwt.sign(data,jwtSecret)
      res.json({ success: true,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;