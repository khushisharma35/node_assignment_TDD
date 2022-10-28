const { response } = require("express");
const {
    create,getMovies,updateMovie , deleteMovie} =require("./movie.service");
   


module.exports ={  
createMovie: (req, res) => {
        const body=req.body;

        create(body
        ,(err, results) => {
            if(err){                
                return res.status(400).json({
                    success:0,
                    message: "User undefined"
                });
            }
            return res.status(201).json({
                success:1,
                data: results,
            });
        });
    },
    
    getMovies:(req,res) =>{
        getMovies((err,results) => {
            if (err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },
    updateMovie:(req,res) => {
        const body= req.body;
        const id = req.body.movieId;
        updateMovie(body,id,(err , results) =>{
            if(err){
                console.log(err);
                return false;
            }
            console.log(results)
            if(!results){
                return res.status(400).json({
                    success:0,
                    message: "failed to update "
                });
            }
            return res.status(200).json({
                success:1,
                message:"updated successfully"
            });
        });
    },
    deleteMovie:(req,res) => {
        const id = req.params.id;
        deleteMovie(id,(err,results) =>{
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.status(404).json({
                    success:0,
                    message: "record not found"
                });
            }
            return res.status(200).json({
                success:1,
                message:"user deleted successfully"
            });
        });
    }

};