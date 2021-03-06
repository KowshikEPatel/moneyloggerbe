const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

router.post("/", async (req,res)=>{

    try {
        const user = await User.findOne({username:req.body.username});
        const hashpass  = await bcrypt.compare(req.body.password,user.password);
        const transactions = await Transaction.find({user:user._id})
        if(hashpass===true){
          res.status(200).json({"login":"success","user":{"userid":user._id,"username":user.username,"useremail":user.email,"transactions":transactions}});
        }
        else{
          res.status(200).json({"login":"failed","message":"wrong password"})
        }
        
      } catch (err) {
        
        res.status(500).json(err);
      }
    
})

router.post("/newuser", async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpass  = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
                                    username:req.body.username,
                                    email:req.body.email,
                                    password:hashpass
                                })
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;

