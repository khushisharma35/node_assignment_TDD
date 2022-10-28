const pool = require("../../database");

module.exports ={
    create: (data, callBack)=> {
        pool.query(
            "insert into shows(movieId,auditoriumId,screenTime,screenNo) values(?,?,?,?)",
            [
                data.movieId,
                data.auditoriumId,
                data.screenTime,
                data.screenNo

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
    getshows: callBack => {
        pool.query(
            'select  * from shows',
            (error, results,fields) => {
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateshow : (data,id,callBack) => {
        //data.passcode = hashSync(data.passcode, 10)
        pool.query(
            'update shows set movieId=?,auditoriumId=?,screenTime=?,screenNo=? where showId =?',
            [   data.movieId,
                data.auditoriumId,
                data.screenTime,
                data.screenNo,
                data.showId
            ],
            (error,results,fields) => {
                if(error) {
                    return callBack(error,null);
                }
                return callBack(null,results);
            },
        );
    },
    deleteshow: (id,callBack)=> {
        pool.query(
            'delete from shows where showId=?',
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