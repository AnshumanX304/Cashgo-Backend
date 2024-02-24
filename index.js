const express=require("express");
const app=express();
const bodyParser=require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/user",require('./Router/userRouter'))
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})

