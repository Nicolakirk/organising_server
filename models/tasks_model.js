const { ident } = require("pg-format");
const { use } = require("../app");
const db = require("../db/connection");


exports.selectTasks = (user_id) => {
 
    const queryString = `SELECT * FROM tasks
    WHERE user_id = $1;`
    return db.query(queryString, [user_id])
    .then ((result)=>{
 return result.rows;

    })

};

exports.checkUserIdExists= (user_id) => {
    
    return db.query( `SELECT * FROM users WHERE user_id =$1;`, [user_id])
    .then((result)=>{
        if(result.rowCount === 0){
            return Promise.reject({status:404, msg: 'user id not found'});
        } else {
            return true;
        }
    })
}

exports.checkUserExists= (username)=>{
    return db.query(' SELECT * FROM users WHERE username=$1;', [username])
    .then((result)=>{
        if(result.rowCount === 0){

            return Promise.reject({status:404, msg: 'Invalid username'});
        } else {
            return true;
        }
    })
};

exports.selectTasksById = (id ) => {

    return db.query (  `
    SELECT * FROM tasks 
    WHERE task_id = $1;`, [id])
         .then((result) => {
            console.log(result)
           if (result.rows.length === 0) {
             return Promise.reject({
               status: 404,
               msg: "Task can't be found",
             })
           } else {
             
             return result.rows[0];
           
           }
         
         });
}