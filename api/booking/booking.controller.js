const { response } = require("express");
const {
    create,getbooking} =require("./booking.service");
    //const {genSaltSync,hashSync} = require("bcrypt");
    //const { sign } =require("jsonwebtoken");
    //const bcrypt = require('bcrypt');



module.exports ={  
createbooking: (req, res) => {
        const body=req.body;

        create(body
        ,(err, results) => {
            if(err){
                
                return response.status(400).json({
                    success:0,
                    message: "data undefined"
                });
            }
            return res.status(201).json({
                success:1,
                data: results,
            });
        });
    },
    
    getbooking:(req,res) =>{
        getbooking((err,results) => {
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
    
};