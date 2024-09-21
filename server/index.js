const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes
//Create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log("Req.body", req.body);
    const { description, completed } = req.body;
    console.log("post ", completed);
    // const completed = false;
    const newTodo = await pool.query(
      "INSERT INTO todo (description,completed) VALUES($1,$2)",
      [description, completed]
    ); //insert into table

    res.json(newTodo.rows);
  } catch (error) {
    console.error(error);
  }
});

//Get all todo

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    console.log("All Todos: ", allTodos.rows);
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error);
  }
});

//Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.error(error);
  }
});
//Update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    console.log(description);
    console.log(id);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 , completed = $2 WHERE todo_id = $3 ",
      [description, completed, id]
    ); //update table
    res.send("Updated the record");
  } catch (error) {
    console.error(error);
  }
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
  }
});

app.listen(5100, () => {
  console.log("Server is running on port 5100");
});
