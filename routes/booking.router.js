const {createbooking,updatebooking,getbooking,deletebooking  } = require("../api/booking/booking.controller");
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation");


router.post("/booking",checkToken,createbooking);
router.get("/booking",checkToken,getbooking);

module.exports = router;
