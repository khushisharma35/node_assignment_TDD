const { createauditorium,getauditorium} = require("../api/auditorium/auditorium.controller");
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation");


router.post("/auditorium",checkToken,createauditorium);
router.get("/auditorium",checkToken,getauditorium);

module.exports = router;