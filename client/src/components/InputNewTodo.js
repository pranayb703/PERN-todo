import React, { useRef } from "react";

const InputNewTodo = () => {
  const refInput = useRef("");
  const handleNewTodo = async () => {
    const newTodo = refInput.current.value;
    const response = await fetch("http://localhost:5100/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newTodo }),
    });
    window.location = "/";
    console.log(response);
  };

  return (
    <div className="mx-auto">
      <h1 className="text-center">PERN TODO List</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex p-4 flex-row"
      >
        <input
          type="text"
          placeholder="Enter new todo"
          className="form-control mx-4"
          ref={refInput}
        />
        <button
          type=""
          onClick={handleNewTodo}
          className="btn btn-primary mx-2 p-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default InputNewTodo;
