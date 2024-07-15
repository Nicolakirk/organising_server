
const { selectTasks, checkUserIdExists, selectTasksById } = require("../models/tasks_model");



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

exports.getTasksById = (req, res, next) =>{
    const { task_id } = req.params;
    
      selectTasksById(task_id).then((task) => {
            res.status(200).send({ task });
          })
          .catch((err)=>{
            next( err);
          });
        };