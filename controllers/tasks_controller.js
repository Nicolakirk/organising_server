
const { selectTasks, checkUserIdExists } = require("../models/tasks_model");



exports.getTasks = (req,res, next) =>{
 
    const { user_id } = req.params;
    const tasksPromises = [selectTasks(user_id), checkUserIdExists(user_id) ];
    Promise.all(tasksPromises)
    .then(([tasks])=>{
        res.status(200).send({ tasks })
    })
    .catch((err)=>{
        next (err);
    })
};