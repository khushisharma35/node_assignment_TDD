const { createUser,getUSERByUSERId,getUSERS,UpdateUSER,deleteUSER,login } = require("../api/users/user.controller");
const { create } = require("../api/users/user.service");
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation");


router.post("/signup",createUser);
router.get("/users",checkToken,getUSERS);
router.get("/users/:id",checkToken,getUSERByUSERId);
router.patch("/users/:id",checkToken,UpdateUSER);
router.delete("/users/:id",checkToken,deleteUSER);
router.post("/login",login); 


module.exports = router;