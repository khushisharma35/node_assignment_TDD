const { hashSync, hash } = require("bcrypt");
const pool = require("../../database");


module.exports ={
    create: (data, callBack)=> {
        pool.query(
            "insert into movie(movieName, movieTime, userId) values(?,?,?)",
            [
                data.movieName,
                data.movieTime,
                data.userId
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
    getMovies: callBack => {
        pool.query(
            'select  * from movie',
            (error, results,fields) => {
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateMovie : (data,callBack) => {
        // data.passcode = hashSync(data.passcode, 10)
        pool.query(
            'update movie set movieName=?,movieTime=?,userId=? where movieId =?',
            [   data.movieName,
                data.movieTime,
                data.userId,
                data.movieId
            ],
            (error,results,fields) => {
                if(error) {
                    return callBack(error,null);
                }
                return callBack(null,results);
            },
        );
    },
    deleteMovie: (id,callBack)=> {
        pool.query(
            'delete from movie where movieId=?',
            [id],
            (error,results,fields) => {
                if(error) {
                   return  callBack(error,null);
                }
                return callBack(null,results);
            }
        );
    },
    
};