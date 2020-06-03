const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator");

router.get('/',auth ,async(req,res)=>{
    try {
        // req.user is accessible form anywhere (its in middleware(auth.js))
        // select is used for not showing something
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
        
    }
})

router.post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Password is required"
      ).exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
  
      try {
        // See if the user exists
  
        let user = await User.findOne({ email: email });
        if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch = await bcrypt.compare(password,user.password)//already got the user 
        if(!isMatch){
          return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload ={
            user:{
              id:user.id
            }
          }
          jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
            if(err) throw err
            res.json({token})
          })

      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }

     


      // Return jasonwebtoken
      // res.send('User registered')
      // get the id of newly created user
     
    }
  );
  


module.exports = router