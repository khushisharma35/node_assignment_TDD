//const { hashSync, hash } = require("bcrypt");
const pool = require("../../database");

module.exports ={
    create: (data, callBack)=> {
        pool.query(
            "insert into booking(paid, noOfSeats, showId,movieId) values(?,?,?,?)",
            [
                data.paid,
                data.noOfSeats,
                data.showId,
                data.movieId
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
    getbooking: callBack => {
        pool.query(
            'select  * from booking',
            (error, results,fields) => {
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    
};