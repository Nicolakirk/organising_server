const express = require("express");
const app = express();
const cors = require('cors');
const { getTasks } = require("./controllers/tasks_controller");


app.use(cors());
app.use(express.json());

app.get('/api/tasks/:user_id/tasks', getTasks);



module.exports= app;