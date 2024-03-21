const express=require("express");
const app=express();
const bodyParser=require('body-parser');
app.use(express.json());
const cors=require('cors');
app.use(bodyParser.urlencoded({extended: false}));
const corsOrigin ={
    origin:'http://localhost:5173', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use("/user",require('./Router/userRouter'))
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})

