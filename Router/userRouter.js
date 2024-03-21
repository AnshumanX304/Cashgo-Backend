const router=require("express").Router();
const userCtrl=require('../Controller/userCtrl');
const auth=require('../Middleware/authcheck')

router.post("/signup",userCtrl.signup);
router.post("/signin",userCtrl.signin);
router.get("/homedata",auth,userCtrl.homedata);

module.exports=router;
