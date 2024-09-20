import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:5100/todos");
    const data = await response.json();
    console.log(data);
    setTodos(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete Click");
    const data = await fetch(`http://localhost:5100/todos/${id}`, {
      method: "DELETE",
    });
    console.log(data);
    setTodos(todos.filter((todo) => todo.todo_id !== id));
  };
  if (todos.length === 0)
    return (
      <div className="text-center mx-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <div className="text-center">
      <h1>Todo List</h1>
      <table className="table table-striped mx-auto text-center table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <th scope={index % 2 === 0 ? "row" : ""}>{todo.todo_id}</th>
              <td>{todo.description}</td>
              <td>
                <EditTodo props={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
