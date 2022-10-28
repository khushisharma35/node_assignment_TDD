const { response } = require("express");
const {
    create,getUSERByUSERId,getUSERS,UpdateUSER ,deleteUSER,getUSERByUSERemail} =require("./user.service");
const {genSaltSync,hashSync} = require("bcrypt");
const { sign } =require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { compareSync } = require("bcrypt");



module.exports ={
    createUser: (req, res) => {
        const body=req.body;

        create(body
        ,(err, results) => {
            if(err){
                
                return response.status(500).json({
                    success:0,
                    message: "Database connection error"
                });
            }
            return res.status(201).json({
                success:1,
                data: results,
            });
        });
    },
    getUSERByUSERId:(req,res) =>{
        const id =req.params.id;
        console.log("hello");
        getUSERByUSERId(id,(err,results) => {
            if(err){
                console.log(err,'some error occured');
                return;
            }
            if(!results) {
                return res.status(404).json({
                    success:0,
                    message: "Record is not found"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
                
            });
            console.log(data);
        });
    },
    getUSERS:(req,res) =>{
        console.log("hello");
        getUSERS((err,results) => {
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    UpdateUSER:(req,res) => {
        const body= req.body;
        console.log("upadeUserBody:",body);
        UpdateUSER(body,(err , results) =>{
            if(err){
                console.log(err);
                return false;
            }
            console.log("result from service",results)
            if(!results){
                return res.status(404).json({
                    success:0,
                    message: "failed to update user"
                });
            }
            return res.status(200).json({
                success:1,
                message:"updated successfully"
            });
        });
    },
    deleteUSER:(req,res) => {
        const data = req.params.id;
        deleteUSER(data,(err,results) =>{
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
            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
    },
    login:(req, res) => {
        const body =req.body;
        getUSERByUSERemail(body.email,(err,results) => {
            if (err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success:0,
                    message:"invalidemail or passcode"
                });
            }
            const result = bcrypt.compareSync(body.passcode,results.passcode);
            console.log(body.passcode);
            console.log(results.passcode)
            console.log(result);
            if(result){
                results.passcode = undefined;
                const jsontoken = sign({ result:results}, "qwe1234" );
                return res.status(200).json({
                    success:1,
                    message:"login successfully done",
                    token: jsontoken
                });
            } else{
            return res.status(401).json({
                success:0,
                data: "invalid email or passcode}}}"

            }); 
        }

        });
    },

};