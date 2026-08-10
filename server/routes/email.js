const express=require("express");

const router=express.Router();

const nodemailer=require("nodemailer");

router.post("/",async(req,res)=>{

const transporter=nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL,

pass:process.env.EMAIL_PASSWORD

}

});

await transporter.sendMail({

from:process.env.EMAIL,

to:req.body.email,

subject:"BookEasy Booking",

html:`

<h2>Your booking is confirmed.</h2>

<p>${req.body.service}</p>

`

});

res.json({

success:true

});

});

module.exports=router;