const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt=require("bcrypt");
const userCtrl={
    signup:async(req,res)=>{
        try{
            let {firstname,lastname,email,password}=req.body;
            email=email.toLowerCase();
            const passwordHash = await bcrypt.hash(password, 12);
            const getUser= await prisma.user.findUnique({
                where:{
                    email:email
                }
            })

            if(!getUser){
                const user = await prisma.user.create({
                    data: {
                      firstname,
                      lastname,
                      email,
                      password:passwordHash
                    },
                })
                
                // console.log(user);

                res.status(200).json({
                    success: true,
                    msg: "Signup successful !",
                });

            }
            else{
                res.status(400).json({ success: false, msg: "User already exists!" });
            }
        }
        catch(error){
            res.status(400).json({success:false,msg:error.message});
            console.log(error);
        }
    }
}

module.exports=userCtrl;