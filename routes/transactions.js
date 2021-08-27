const router = require("express").Router();
const Transaction = require("../models/Transaction");


router.post("/add",async (req,res)=>{

    try {
            const newTrans = new Transaction({
                                                text:req.body.text,
                                                type:req.body.type,
                                                amount:req.body.amount,
                                                user:req.body.user,
                                                group:{"type":"nil"} 
                                            })
            const trans = await newTrans.save()
            res.status(200).json(trans)
      } catch (err) {
          console.log(err)
        res.status(500).json(err);
      }
})

router.post("/delete",async (req,res)=>{

    try {
            const transaction = await Transaction.findByIdAndDelete(req.body.id)
            res.status(200).json({"status":"success","message":transaction})

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;