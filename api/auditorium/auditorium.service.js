const pool = require("../../database");

module.exports ={
    create: (data, callBack)=> {
        // console.log(typeof(data.auditoriumName))
        // if(typeof(data.auditoriumName)=='number'){return callBack(true,null)}
        pool.query(
            "insert into auditorium(auditoriumName,seats) values(?,?)",
            [
                data.auditoriumName,
                data.seats
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
    getauditorium: callBack => {
        pool.query(
            'select  * from auditorium',
            (error, results,fields) => {
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    
    
};