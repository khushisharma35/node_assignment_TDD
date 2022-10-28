const { response } = require("express");
const {
    create,getauditorium} =require("./auditorium.service");
    //const {genSaltSync,hashSync} = require("bcrypt");
    //const { sign } =require("jsonwebtoken");
    //const bcrypt = require('bcrypt');



module.exports ={  
createauditorium: (req, res) => {
        const body=req.body;

        create(body
        ,(err, results) => {
            if(err){
                
                return res.status(400).json({
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
    
    getauditorium:(req,res) =>{
        getauditorium((err,results) => {
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