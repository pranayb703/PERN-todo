import React, { useState } from "react";

const EditTodo = ({ props }) => {
  //console.log(props.completed);
  const [desc, setDesc] = useState(props.description);
  const [completed, setCompleted] = useState(props.completed);
  const handleSave = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5100/todos/${props.todo_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: desc, completed: completed }),
      }
    );
    console.log(response);
    window.location = "/";
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${props.todo_id}`}
      >
        Edit
      </button>

      <div class="modal" id={`id${props.todo_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                  setDesc(props.description);
                }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              <input
                className="m-3"
                type="checkbox"
                onChange={(e) => {
                  setCompleted(e.target.checked);
                  //console.log(e.target.checked);
                }}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setDesc(props.description);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
