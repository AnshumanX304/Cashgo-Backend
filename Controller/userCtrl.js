const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
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
                });
                console.log(user);
                const accesstoken=createAccessToken({id:user.id});

                

                res.status(200).json({
                    success: true,
                    msg: "Signup successful !",
                    accesstoken
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
    },
    signin:async(req,res)=>{
        try{
            let {email,password}=req.body;
            email=email.toLowerCase();

            const getUser= await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
            const result = await bcrypt.compare(password, getUser.password);
            if(!result)throw new Error("Password did not match !")
            const accesstoken=createAccessToken({id:getUser.id});
            res.status(200).json({
                success: true,
                msg: "Sigin successful !",
                accesstoken
            });

            // if(!getUser)throw new Error("No user found !");
            // const result=await bcrypt.compare(password,getUser.password)
        }
        catch(error){
            res.status(400).json({success:false,msg:error.message});
            console.log(error);
        }
    }

}

const createAccessToken=(user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
}


module.exports=userCtrl;