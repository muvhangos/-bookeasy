const express=require("express");

const router=express.Router();

router.post("/",async(req,res)=>{

// Twilio or Meta WhatsApp API integration goes here

console.log(req.body);

res.json({

success:true,

message:"WhatsApp notification queued."

});

});

module.exports=router;