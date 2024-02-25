const router=require("express").Router();
const userCtrl=require('../Controller/userCtrl');


router.post("/signup",userCtrl.signup);
router.post("/signin",userCtrl.signin);

module.exports=router;
