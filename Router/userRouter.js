const router=require("express").Router();
const userCtrl=require('../Controller/userCtrl');
router.post("/signup",userCtrl.signup);
module.exports=router;
