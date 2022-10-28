const { createMovie, deleteMovie, getMovies, updateMovie } = require("../api/movie/movie.controller");
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation");


router.post("/movie",checkToken,createMovie);
router.get("/movie",checkToken,getMovies);
router.patch("/movie/:id",checkToken,updateMovie);
router.delete("/movie/:id",checkToken,deleteMovie);


module.exports = router;