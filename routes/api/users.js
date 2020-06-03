const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // See if the user exists

      let user = await User.findOne({ email: email });
      if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
     // Get users gravatar
    const avatar = gravatar.url(email,{
      s:'200',
      r:'pg',
      d:'mm'
    })

    user = new User ({
      name,
      email,
      avatar,
      password
    })
   
    // encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)

    await user.save()

    // Return jasonwebtoken
    // res.send('User registered')
    // get the id of newly created user
    const payload ={
      user:{
        id:user.id
      }
    }
    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
      if(err) throw err
      res.json({token})
    })
  }
);

module.exports = router;
