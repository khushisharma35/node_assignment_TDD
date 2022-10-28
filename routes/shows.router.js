const {createshow,getshows,updateshow,deleteshow  } = require("../api/shows/shows.controller");
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation");


router.post("/show",checkToken,createshow);
router.get("/show",checkToken,getshows);
router.patch("/show/:id",checkToken,updateshow);
router.delete("/show/:id",checkToken,deleteshow);


module.exports = router;