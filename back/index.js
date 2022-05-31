const express = require('express');
const app = express();
const port = 3000
const cors = require("cors");
const taskRoutes = require("./router/tasksRoutes");
const usersRoutes = require("./router/usersRoutes");
const authRoutes = require("./router/authRoutes");
const { connectMongoose } = require('./connection/mongoose');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({
  origin: "*",
}))

connectMongoose();

app.use("/api/tasks", taskRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/users", authRoutes);


app.listen(port, () => {
  console.log(`App listening on port ${port} :)`)
})




