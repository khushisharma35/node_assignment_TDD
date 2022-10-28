const { hashSync, hash } = require("bcrypt");
const pool = require("../../database");

module.exports ={
    create: (data, callBack)=> {
        data.passcode = hashSync(data.passcode, 10)
        pool.query(
            "insert into user(name,userType,email,passcode) values(?,?,?,?)",
            [
                data.name,
                data.userType,
                data.email,
                data.passcode
            ],
            (error,results,fields) =>{
                console.log("test",error)
                if(error) {
                    return callBack(error,null);
                }
                
                return callBack( null,results);
            }
        );
    },
    getUSERS: callBack => {
        pool.query(
            'select  * from USER',
            (error, results,fields) => {
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUSERByUSERId : (data,callBack) => {
        console.log(data)
        pool.query(
            "select name,email,passcode from USER where userId = ?",
            [
            data],
            (error,results,fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUSERByUSERemail :  (data,callBack) => {
        pool.query(
            "select * from USER where  email =?",
            [data],
            (error,results,fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    UpdateUSER : (data,callBack) => {
        console.log({data});
        data.passcode = hashSync(data.passcode, 10)
        pool.query(
            "update USER set name=?,userType=?,email=?,passcode=? where userId =?",
            [   data.name,
                data.userType,
                data.email,
                data.passcode,
                data.id
            ],
            (error,results,fields) => {
                if(error) {
                    return callBack(error,null);
                }
                return callBack(null,results);
            },
        );
    },
    deleteUSER: (id,callBack)=> {
        pool.query(
            "delete from USER where userId=?",
            [id],
            (error,results,fields) => {
                if(error) {
                   return  callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
   
};